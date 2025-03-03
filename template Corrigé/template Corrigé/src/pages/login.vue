<script setup lang="ts">
import { ref } from 'vue'
import { useGenerateImageVariant } from '@/@core/composable/useGenerateImageVariant'
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import authV2LoginIllustrationBorderedDark from '@images/pages/auth-v2-login-illustration-bordered-dark.png'
import authV2LoginIllustrationBorderedLight from '@images/pages/auth-v2-login-illustration-bordered-light.png'
import authV2LoginIllustrationDark from '@images/pages/auth-v2-login-illustration-dark.png'
import authV2LoginIllustrationLight from '@images/pages/auth-v2-login-illustration-light.png'
import authV2LoginMaskDark from '@images/pages/auth-v2-login-mask-dark.png'
import authV2LoginMaskLight from '@images/pages/auth-v2-login-mask-light.png'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { useRouter } from 'vue-router'

const form = ref({
  email: '',
  password: '',
  remember: false,
})

const isPasswordVisible = ref(false)
const authV2LoginMask = useGenerateImageVariant(authV2LoginMaskLight, authV2LoginMaskDark)
const authV2LoginIllustration = useGenerateImageVariant(authV2LoginIllustrationLight, authV2LoginIllustrationDark, authV2LoginIllustrationBorderedLight, authV2LoginIllustrationBorderedDark, true)

const router = useRouter()
const errorMessage = ref('')

const handleLogin = () => {
  errorMessage.value = ''

  // Vérification des champs vides
  if (!form.value.email || !form.value.password) {
    errorMessage.value = 'Veuillez entrer votre email et mot de passe'
    return
  }

  try {
  const usersJson = localStorage.getItem('users');
  if (!usersJson) {
    throw new Error('Aucun utilisateur n\'est enregistré');
  }
  const users = JSON.parse(usersJson);
  if (!Array.isArray(users) || users.length === 0) {
    throw new Error('Aucun utilisateur n\'est enregistré');
  }
  const user = users.find((u) => u.email.trim().toLowerCase() === form.value.email.trim().toLowerCase());
  if (!user) {
    throw new Error('Cet email n\'existe pas');
  }

    // Vérification du mot de passe (comparaison directe puisque les mots de passe ne sont pas hashés)
    if (user.password !== form.value.password) {
      errorMessage.value = 'Mot de passe incorrect'
      return
    }

    // Stockage des informations de l'utilisateur connecté (sauf mot de passe)
    const userSession = {
      id: user.id || Date.now(), // Utiliser l'ID existant ou en créer un
      name: user.name,
      email: user.email,
      isAuthenticated: true,
      token: generateToken(), // Fonction pour générer un token simple
      lastLogin: new Date().toISOString()
    }
    
    localStorage.setItem('currentUser', JSON.stringify(userSession))
    
    // Si "Remember me" est coché, stocker l'email pour la prochaine connexion
    if (form.value.remember) {
      localStorage.setItem('rememberedEmail', form.value.email)
    } else {
      localStorage.removeItem('rememberedEmail')
    }

    // Redirection après connexion
    router.push('/')
  } catch (error) {
  errorMessage.value = error.message;
}
}

// Fonction pour générer un token simple (à remplacer par une solution plus sécurisée en production)
const generateToken = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// Vérifier si un email a été mémorisé
const checkRememberedEmail = () => {
  const rememberedEmail = localStorage.getItem('rememberedEmail')
  if (rememberedEmail) {
    form.value.email = rememberedEmail
    form.value.remember = true
  }
}

// Exécuter au chargement du composant
checkRememberedEmail()
</script>


<template>
 

  <VRow no-gutters class="auth-wrapper">
    <VCol md="8" class="d-none d-md-flex align-center justify-center position-relative">
      <div class="d-flex align-center justify-center pa-10">
        <img :src="authV2LoginIllustration" class="auth-illustration w-100" alt="auth-illustration" />
      </div>
      <VImg :src="authV2LoginMask" class="d-none d-md-flex auth-footer-mask" alt="auth-mask" />
    </VCol>

    <VCol cols="12" md="4" class="auth-card-v2 d-flex align-center justify-center" style="background-color: rgb(var(--v-theme-surface));">
      <VCard flat :max-width="500" class="mt-12 mt-sm-0 pa-5 pa-lg-7">
        <VCardText>
          <h4 class="text-h4 mb-1">Welcome to <span class="text-capitalize">{{ themeConfig.app.title }}! 👋🏻</span></h4>
          <p class="mb-0">Please sign-in to your account and start the adventure</p>
        </VCardText>

        <VCardText>
          <VForm @submit.prevent= "handleLogin">
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <VTextField v-model="form.email" autofocus label="Email" type="email" placeholder="johndoe@email.com" />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <VTextField v-model="form.password" label="Password" placeholder="············" :type="isPasswordVisible ? 'text' : 'password'" :append-inner-icon="isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'" @click:append-inner="isPasswordVisible = !isPasswordVisible" />
              </VCol>

              <!-- message d'erreur -->
              <VCol cols="12" v-if="errorMessage">
                <VAlert type="error">{{ errorMessage }}</VAlert>
              </VCol>

              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap my-6 gap-x-2">
                <VCheckbox v-model="form.remember" label="Remember me" />
                <a class="text-primary" href="javascript:void(0)">Forgot Password?</a>
              </div>

              <!-- login button -->
              <VCol cols="12">
                <VBtn block type="submit">Login</VBtn>
              </VCol>

              <!-- create account -->
              <VCol cols="12" class="text-body-1 text-center">
                <span class="d-inline-block">New on our platform?</span>
                <a class="text-primary ms-1 d-inline-block text-body-1"  href="/register" >Create an account</a>
              </VCol>

              <VCol cols="12" class="d-flex align-center">
                <VDivider />
                <span class="mx-4 text-high-emphasis">or</span>
                <VDivider />
              </VCol>

              <!-- auth providers -->
              <VCol cols="12" class="text-center">
                <AuthProvider />
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>



<style lang="scss">
@use "@core/scss/template/pages/page-auth";
</style>
