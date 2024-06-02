
<script setup lang="ts">
import AdminItem from '@/components/AdminItem.vue';
import ProfileItem from '@/components/ProfileItem.vue';
import TableItem from '@/components/TableItem.vue';
import ChartJsItem from '@/components/ChartJsItem.vue';
</script>
<template>
    <ProfileItem />
    <AdminItem />
    <ChartJsItem class="jsItem"/>
    <TableItem />
</template>
<style scoped>
.jsItem{
    margin-bottom: 100px;
}

</style>