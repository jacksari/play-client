<script setup lang="ts">

import {useProductStore} from "~/store/productStore";

const modalAddProduct = ref(false);

const storeProduct = useProductStore();

const openAddProductModal = () => {
  modalAddProduct.value = true;
}

const closeAddProductModal = () => {
  modalAddProduct.value = false;
}

</script>
<template>
  <div class="products-list-header">

    <Button type="button" label="Search" icon="pi pi-search" :loading="loading" @click="storeProduct.getProducts()" />

    <Button label="Agregar produtos" icon="pi pi-plus" @click="openAddProductModal" />
    <ProductAdd
      v-model="modalAddProduct"
      @refresh="closeAddProductModal"
    />
  </div>
</template>

<style>
.products-list-header{
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>