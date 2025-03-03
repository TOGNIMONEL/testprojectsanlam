<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'
import authV2LoginIllustrationBorderedDark from '@images/pages/auth-v2-login-illustration-bordered-dark.png'
import authV2LoginIllustrationBorderedLight from '@images/pages/auth-v2-login-illustration-bordered-light.png'
import authV2LoginIllustrationDark from '@images/pages/auth-v2-login-illustration-dark.png'
import authV2LoginIllustrationLight from '@images/pages/auth-v2-login-illustration-light.png'
import authV2LoginMaskDark from '@images/pages/auth-v2-login-mask-dark.png'
import authV2LoginMaskLight from '@images/pages/auth-v2-login-mask-light.png'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'



definePage({
  meta: {
    layout: 'blank',
    public: true,
  },
})

const router = useRouter()

const form = ref({
  name: '',
  email: '',
  password: '',
})

const errorMessage = ref('')
const isPasswordVisible = ref(false)

const authV2LoginMask = useGenerateImageVariant(authV2LoginMaskLight, authV2LoginMaskDark)
const authV2LoginIllustration = useGenerateImageVariant(
  authV2LoginIllustrationLight,
  authV2LoginIllustrationDark,
  authV2LoginIllustrationBorderedLight,
  authV2LoginIllustrationBorderedDark,
  true
)

const handleRegister = () => {
  errorMessage.value = ''

  // Vérification des champs vides
  if (!form.value.email || !form.value.password || !form.value.name) {
    errorMessage.value = 'Veuillez remplir tous les champs'
    return
  }

  try {
    // Récupération des utilisateurs enregistrés
    let users = localStorage.getItem('users')
    if (users === null) {
      users = []
    } else {
      users = JSON.parse(users)
    }

    // Vérification si l'utilisateur existe déjà
    const userExists = users.find((u) => u.email.trim().toLowerCase() === form.value.email.trim().toLowerCase())
    if (userExists) {
      errorMessage.value = 'Cet email est déjà utilisé'
      return
    }

    // Création du nouvel utilisateur
    const newUser = {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
    }

    // Ajout du nouvel utilisateur
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))

    // Connexion automatique après inscription
    localStorage.setItem('currentUser', JSON.stringify({
      name: newUser.name,
      email: newUser.email,
    }))

    // Redirection après inscription
    router.push('/login')
  } catch (error) {
    errorMessage.value = 'Une erreur est survenue lors de l\'inscription'
  }
}


</script>

<template>
  <VRow no-gutters class="auth-wrapper">
    <VCol md="8" class="d-none d-md-flex align-center justify-center position-relative">
      <div class="d-flex align-center justify-center pa-10">
        <img :src="authV2LoginIllustration" class="auth-illustration w-100" alt="auth-illustration">
      </div>
      <VImg :src="authV2LoginMask" class="d-none d-md-flex auth-footer-mask" alt="auth-mask" />
    </VCol>

    <VCol cols="12" md="4" class="auth-card-v2 d-flex align-center justify-center">
      <VCard flat :max-width="500" class="mt-12 mt-sm-0 pa-5 pa-lg-7">
        <VCardText>
          <h4 class="text-h4 mb-1">Créer un compte</h4>
          <p class="mb-0">Rejoignez-nous dès maintenant</p>
        </VCardText>

        <VCardText>
          <VForm @submit.prevent="handleRegister">
            <VRow>
              <VCol cols="12">
                <VTextField v-model="form.name" label="Nom" placeholder="John Doe" />
              </VCol>

              <VCol cols="12">
                <VTextField v-model="form.email" label="Email" type="email" placeholder="johndoe@email.com" />
              </VCol>

              <VCol cols="12">
                <VTextField 
                  v-model="form.password"
                  label="Mot de passe"
                  placeholder="••••••••"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
              </VCol>

              <VCol cols="12" v-if="errorMessage">
                <VAlert type="error">{{ errorMessage }}</VAlert>
              </VCol>

              <VCol cols="12">
                <VBtn block type="submit">S'inscrire</VBtn>
              </VCol>

              <VCol cols="12" class="text-center">
                <span>Déjà un compte ?</span>
                <a class="text-primary ms-1" href="/login">Se connecter</a>
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
