<script setup lang="ts">
import {useProductStore} from "~/store/productStore";
import ProductsListHeader from "~/components/products/ProductsListHeader.vue";
import type {IProduct} from "~/interfaces/product";

const storeProduct = useProductStore();

const modalEditProduct = ref<{
  product: IProduct | null;
  show: boolean;
}>({
  product: null,
  show: false
})

const openModalEditProduct = (product: IProduct | null) => {
  modalEditProduct.value.product = product;
  modalEditProduct.value.show = true;
}

onMounted(() => {
 setTimeout(() => {
   storeProduct.getProducts();
 }, 0)
})

</script>

<template>
  <Card >

    <template #title>Productos</template>
    <template #content>

      <Divider />

      <ProductsListHeader/>

      <Divider />
      <div class="card">
        <DataTable :value="storeProduct.products" tableStyle="min-width: 50rem" >
          <Column field="name" header="Nombre"></Column>
          <Column field="description" header="Descripcion"></Column>
          <Column field="provider" header="Proveedor"></Column>
          <Column field="category.name" header="Categoria"></Column>
          <Column field="status.name" header="Estado"></Column>

          <Column header="Imagen">
            <template #body="slotProps">

              <img :src="`${slotProps.data.image}`" :alt="slotProps.data.image" class="w-24 h-24 rounded" />
            </template>
          </Column>

          <Column header="Options">
            <template #body="slotProps">
          <div class="flex gap-2">
            <Button label="Eliminar"  severity="danger" @click="storeProduct.deleteProduct(slotProps.data.id)" />
            <Button label="Editar"  severity="warn" @click="openModalEditProduct(slotProps.data)" />
          </div>

            </template>
          </Column>

          <template #empty>
           <p class="text-center">
             No hay productos disponibles.
           </p>
          </template>
        </DataTable>

        <ProductEdit
          v-model="modalEditProduct.show"
          :product="modalEditProduct.product"
        />

      </div>
    </template>

  </Card>
</template>

<style>
.container{
  margin: 20px 0;
}
</style>
