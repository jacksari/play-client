<script setup lang="ts">

import {useProductStore} from "~/store/productStore";
import type {IProduct} from "~/interfaces/product";

const emits = defineEmits(["update:modelValue", "refresh"]);

interface Props {
  modelValue: boolean;
  product: IProduct | null;
}

const storeProduct = useProductStore();

const src = ref(null);

function onFileSelect(event) {
  const file = event.files[0];
  const reader = new FileReader();

  reader.onload = async (e) => {
    src.value = e.target.result;
  };

  reader.readAsDataURL(file);
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  product : null
});

const closeModal = () => {
  emits('update:modelValue', false);
  storeProduct.clearFormProducts()
}

watch(() => props.modelValue, () => {
  if(props.modelValue) {
    storeProduct.getDetailsProductById(props.product?.id)
    storeProduct.getStatuses()
    storeProduct.getCategories()
  }
})


</script>

<template>
  <Dialog v-model:visible="props.modelValue" modal  header="Agregar producto" :style="{ width: '25rem' }">
    <template #container="{ closeCallback }">
     <Card>
       <template #title>
         Editar producto
       </template>
       <template #content>
         <div class="flex items-start flex-col gap-2 mb-4">
           <label for="email" class="font-semibold w-24">Nombre</label>
           <InputText type="text" v-model="storeProduct.storeProduct.name"  class="w-full"/>
         </div>
         <div class="flex items-start flex-col gap-2 mb-4">
           <label for="email" class="font-semibold w-24">Proveedor</label>
           <InputText type="text" v-model="storeProduct.storeProduct.provider" class="w-full" />
         </div>
         <div class="flex items-start flex-col gap-2 mb-4">
           <label for="email" class="font-semibold w-24">Descripcion</label>
           <Textarea type="text" v-model="storeProduct.storeProduct.description" class="w-full" />
         </div>
         <div class="flex items-start flex-col gap-2 mb-4">
           <label for="email" class="font-semibold w-24">Categoria</label>
           <Select
               v-model="storeProduct.storeProduct.categoryId"
               :options="storeProduct.categories"
               optionLabel="name"
               option-value="id"
               placeholder="Seleccionar categoria"
               class="w-full"
           />
         </div>
         <div class="flex items-start flex-col gap-2 mb-4">
           <label for="email" class="font-semibold w-24">
             estado
           </label>
           <Select
               v-model="storeProduct.storeProduct.statusId"
               :options="storeProduct.statuses"
               optionLabel="name"
               option-value="id"
               placeholder="Seleccionar estado"
               class="w-full"
           />
         </div>

         <div class="flex items-start flex-col gap-2 mb-4">
           <label for="email" class="font-semibold w-24">Imagen</label>
           <FileUpload mode="basic" @select="onFileSelect" customUpload auto severity="secondary" class="p-button-outlined" />
           <img v-if="src" :src="src" alt="Image" class="shadow-md rounded-xl w-full sm:w-64" style="filter: grayscale(100%)" />
         </div>
         <div class="flex justify-end gap-2">
           <Button type="button" label="Cancelar" severity="secondary" @click="closeModal"></Button>
           <Button type="button" label="Editar" @click="storeProduct.editProduct(
               () => closeModal()
           )"></Button>
         </div>
       </template>

     </Card>
    </template>

  </Dialog>
</template>