<!-- 檔名的[] 意思同 router的 /:  把值當作id的變數 -->

<!--  route.params.id 會顯示商品id -->

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">{{ product.name }}</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12" md="6">
        <v-img :src="product.image"></v-img>
      </v-col>
      <v-col cols="12" md="6">
        <p>{{ $t('productCategory.' + product.category) }}</p>
        <p>{{ product.price }}</p>
        <p>{{ product.description }}</p>
        <v-form :disabled="isSubmitting" @submit.prevent="submit">
          <v-text-field
            v-model.number="quantity.value.value"
            type="number"
            :error-messages="quantity.errorMessage.value"
          ></v-text-field>
          <v-btn type="submit" prepend-icon="mdi-cart" :loading="isSubmitting">{{
            $t('product.addCart')
          }}</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
  <!-- 如果商品不在架上就會顯示overlay -->
  <v-overlay
    :model-value="!product.sell"
    class="align-center justify-center"
    scrim="black"
    opacity="0.8"
    persistent
  >
    <h1 class="text-center">{{ $t('api.productNotOnSell') }}</h1>
  </v-overlay>
</template>

<script setup>
import { ref } from 'vue'
import { useAxios } from '@/composable/axios'
import { useRoute, useRouter } from 'vue-router'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'
import { useSnackbar } from 'vuetify-use-dialog'

const { api, apiAuth } = useAxios()
const { t } = useI18n()
const createSnackbar = useSnackbar()

//  route=>取現在這頁資訊用
//  router=>跳轉用
const route = useRoute()
const router = useRouter()

const user = useUserStore()

const product = ref({
  _id: '',
  name: '',
  price: 0,
  description: '',
  image: '',
  sell: true,
  category: 'food',
})
// 取資料
const getProduct = async () => {
  try {
    const { data } = await api.get('/product/' + route.params.id)
    product.value = data.result
    document.title = product.value.name + ' | 購物網站'
  } catch (error) {
    console.log(error)
    // 商品不存在時,丟回首頁
    router.push('/')
    // 商品下架時要跳出提示
    // https://vuetifyjs.com/en/components/overlays/#loader
  }
}
getProduct()

const schema = yup.object({
  quantity: yup
    .number()
    .typeError(t('product.addCartQuantityInvalid'))
    .required(t('product.addCartQuantityInvalid'))
    .positive(t('product.addCartQuantityInvalid'))
    .integer(t('product.addCartQuantityInvalid')),
})
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    quantity: 1,
  },
})
const quantity = useField('quantity')

const submit = handleSubmit(async (values) => {
  if (!user.isLoggedIn) {
    router.push('/login')
    return
  }
  try {
    const { data } = await apiAuth.patch('/user/cart', {
      product: product.value._id,
      quantity: values.quantity,
    })
    user.cart = data.result
    createSnackbar({
      text: t('product.addCartSuccess'),
      snackbarProps: {
        color: 'green',
      },
    })
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
  title: 'nav.product'
</route>
