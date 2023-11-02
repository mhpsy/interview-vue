<script setup lang="ts">
import ThreeStatusCheckbox from "@/components/TreeSelectCard/com/three-status-checkobx.vue";
import {computed, inject} from "vue";

const props = defineProps({
    item: {
        type: Object,
        required: true
    }
})

const selectDept = inject('selectDept', undefined);

const emit = defineEmits(['node-click', 'check-click'])

const nodeClick = () => {
    emit('node-click', props.item)
}

const useThisDept = computed(() => {
    const thisDept = selectDept.thisDept.value
    if (!thisDept) return {id: undefined}
    return thisDept
})
</script>

<template>
    <div class="dept-item">
        <div @click.stop="nodeClick" class="label-box" :class="[{'select':item.id===useThisDept.id}]">
            <three-status-checkbox @click-check-box="$emit('check-click',item)" :value="item.flag"
                                   v-model="item.flag"></three-status-checkbox>
            <div class="label">{{ item.label }}</div>
        </div>
        <div v-if="item.children && item.children.length" class="children">
            <dept-item @node-click="$emit('node-click', $event)"
                       @check-click="$emit('check-click', $event)"
                       v-for="child in item.children" :key="child.id"
                       :item="child"></dept-item>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.dept-item {

    .label-box {
        display: flex;
        //padding: 10px;
        cursor: pointer;

        &.select {
            background-color: #f5f5f5;
        }

        &:hover {
            background-color: #f5f5f5;
        }
    }

    .label {
        line-height: 36px;
    }

    .children {
        margin-left: 20px;
    }
}

</style>
