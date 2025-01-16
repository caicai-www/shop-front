<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <!-- 以下兩種寫法都可以 -->
        <h1 class="text-center">{{ $t('nav.register') }}</h1>
        <!-- https://kazupon.github.io/vue-i18n/api/#v-t -->
        <!-- <h1 v-t="'nav.register'"></h1> -->
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12">
        <v-form :disabled="isSubmitting" @submit.prevent="submit">
          <v-text-field
            v-model="account.value.value"
            :error-messages="account.errorMessage.value"
            :label="$t('user.account')"
            minlength="4"
            maxlength="20"
            counter
          />
          <v-text-field
            v-model="email.value.value"
            :error-messages="email.errorMessage.value"
            :label="$t('user.email')"
          />
          <v-text-field
            v-model="password.value.value"
            :error-messages="password.errorMessage.value"
            :label="$t('user.password')"
            minlength="4"
            maxlength="20"
            counter
            type="password"
          />
          <v-text-field
            v-model="passwordConfirm.value.value"
            :error-messages="passwordConfirm.errorMessage.value"
            :label="$t('user.passwordConfirm')"
            minlength="4"
            maxlength="20"
            counter
            type="password"
          />
          <div class="text-center">
            <v-btn :loading="isSubmitting" type="submit" color="primary">{{
              $t('register.submit')
            }}</v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// vee-validate 表單管理的套件
import { useForm, useField } from 'vee-validate'
// yup
import * as yup from 'yup'
import validator from 'validator'
// 多語系套件
import { useI18n } from 'vue-i18n'
import { useAxios } from '@/composable/axios.js'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const { api } = useAxios()
const createSnackbar = useSnackbar()
const router = useRouter()

// ()裡面可以寫驗證的東西
// .test是不是英數字
// https://github.com/jquense/yup
//                ↓所有欄位都要是個物件,去做物件驗證
// 驗證規則要跟後端寫得一樣!
const schema = yup.object({
  account: yup
    // 資料型態是文字
    .string()
    // 必填
    .required(t('api.userAccountRequired'))
    // 最短長度
    .min(4, t('api.userAccountTooShort'))
    // 最長長度
    .max(20, t('api.userAccountTooLong'))
    // 自訂驗證(自訂驗證名稱, 錯誤訊息, function)
    .test('isAlphanumeric', t('api.userAccountInvalid'), (value) =>
      validator.isAlphanumeric(value),
    ),
  email: yup
    .string()
    .required(t('api.userEmailRequired'))
    .test('isEmail', t('api.userEmailInvalid'), (value) => validator.isEmail(value)),
  password: yup
    .string()
    .required(t('api.userPasswordRequired'))
    .min(4, t('api.userPasswordTooShort'))
    .max(20, t('api.userPasswordTooLong')),
  passwordConfirm: yup
    .string()
    // .oneof(陣列,訊息) 必須要是陣列內其中一個值
    // .ref(欄位名稱)    取得欄位得值
    // .ref('password') password欄位的值
    .oneOf([yup.ref('password')], t('api.userPasswordNotMatch')),
})

// 使用順序一定要先 useForm 再用 account
// handleSubmit :
// isSubmitting : 判斷表單是不是在送出中
// 建立表單
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
})
// 建立欄位
//   ★↓這裡的名字要跟yup.object裡面的名字一樣
const account = useField('account')
const email = useField('email')
const password = useField('password')
const passwordConfirm = useField('passwordConfirm')

const submit = handleSubmit(async (values) => {
  try {
    await api.post('/user', {
      account: values.account,
      email: values.email,
      password: values.password,
    })
    createSnackbar({
      text: t('register.success'),
      snackbarProps: {
        color: 'green',
      },
    })
    router.push('/login')
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: t('api.' + (error?.response?.data?.message || 'unknownError')),
      snackbarProps: {
        color: 'red',
      },
    })
  }
})
</script>

<route lang="yaml">
meta:
  title: 'nav.register'
</route>
