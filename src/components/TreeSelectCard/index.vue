<script setup>
import deptItem from "@/components/TreeSelectCard/com/deptItem.vue";
import {computed, provide, ref, toRaw} from "vue";

const props = defineProps({
    userList: {
        type: Array,
        default: () => []
    },
    deptTree: {
        type: Array,
        default: () => []
    },
    personList: {
        type: Array,
        default: () => []
    },
})

const emit = defineEmits(['update:personList'])

const realUseData = ref(undefined)
const thisDept = ref(undefined)
const internalPersonIdList = ref(undefined)


//处理数据
const integrateUsersToDept = (deptList, userList) => {
    deptList.forEach(dept => {
        dept.userList = []
        userList.forEach(user => {
            if (Number(dept.id) === Number(user.deptId)) {
                dept.userList.push(user)
            }
        })
        if (dept.children && dept.children.length > 0) {
            integrateUsersToDept(dept.children, userList)
        }
    })
    return deptList
}

const isSelectClick = (data) => {
    const index = internalPersonIdList.value.indexOf(data);
    if (index !== -1) {
        internalPersonIdList.value.splice(index, 1);
    }
    console.log(internalPersonIdList.value)
    emit('update:personList', internalPersonIdList.value);
    checkDeptStatus(realUseData)
}


//点击部门
const clickDeptItem = (data) => {
    thisDept.value = data
}


//点击用户
const selectUser = (data) => {
    if (internalPersonIdList.value.includes(data)) {
        const index = internalPersonIdList.value.indexOf(data);
        if (index !== -1) {
            internalPersonIdList.value.splice(index, 1);
        }
    } else {
        internalPersonIdList.value.push(data);
    }
    emit('update:personList', internalPersonIdList.value);
    //判断每一个部门的状态
    checkDeptStatus(realUseData)
}


//检查部门状态
const checkDeptStatus = (deptItem) => {
    deptItem = deptItem.value || deptItem
    //更新状态
    //有这个部门全部的人员 就更新flag 为 all
    //没有这个部门的人员 就更新flag 为 zero
    //有这个部门的人员 但是不是全部的人员 就更新flag 为 half
    for (let i = 0; i < deptItem.length; i++) {
        const dept = deptItem[i];
        if (dept.children && dept.children.length > 0) {
            checkDeptStatus(dept.children)
        }
        if (dept.userList.length === 0) {
            dept.flag = 'zero'
            continue;
        }
        dept.flag = diffArray(dept.userList, internalPersonIdList.value)
    }
}

//diff数组
const diffArray = (arr1, arr2) => {
    const isEqual = arr1.every(item => arr2.includes(item));
    if (isEqual)
        return "all";
    else if (arr1.some(item => arr2.includes(item)))
        return "half";
    else
        return "zero";
}


//点击部门复选框
const clickDeptCheck = (data) => {
    /**
     * undefined -> all
     * all -> zero
     * zero -> all
     * half -> all
     */
    if (!data.flag) {
        all(data)
        return
    }

    if (data.flag === 'all') {
        zero(data)
        return
    }

    if (data.flag === 'half') {
        all(data)
        return
    }

    if (data.flag === 'zero') {
        all(data)
        return
    }
}
//全选逻辑
const all = (data) => {
    data.flag = 'all'
    if (data.children && data.children.length > 0) {
        data.children.forEach(child => {
            all(child)
        })
    }
    if (data.userList && data.userList.length > 0) {
        data.userList.forEach(user => {
            if (!internalPersonIdList.value.includes(user)) {
                internalPersonIdList.value.push(user)
            }
        })
    }
}
//取消逻辑
const zero = (data) => {
    data.flag = 'zero'
    if (data.children && data.children.length > 0) {
        data.children.forEach(child => {
            zero(child)
        })
    }
    if (data.userList && data.userList.length > 0) {
        data.userList.forEach(user => {
            const index = internalPersonIdList.value.indexOf(user);
            if (index !== -1) {
                internalPersonIdList.value.splice(index, 1);
            }
        })
    }
}

//判断是否选中
const isSelect = (item) => {
    if (!item) return false
    return internalPersonIdList.value.includes(item)
}

const thisDeptUserList = computed(() => {
    if (!thisDept.value) return []
    return thisDept.value.userList
})

provide("selectDept", {
    thisDept
})

const init = () => {
    internalPersonIdList.value = props.personList || [];
    realUseData.value = integrateUsersToDept(JSON.parse(JSON.stringify(props.deptTree)), props.userList)
    checkDeptStatus(realUseData.value)
}

init()
</script>

<template>
    <div class="select-list-big-box">
        <div class="select-list-label">
            已选中的员工：
        </div>
        <div class="select-list">
            <div class="select-item" @click="isSelectClick(item)" v-for="item in internalPersonIdList"
                 :key="item.userId">
                {{ item.nickName }}
            </div>
        </div>
        <div class="tree-select-box">
            <div class="dept">
                <div class="dept-label">
                    部门列表：
                </div>
                <div class="dept-item" v-for="item in realUseData">
                    <deptItem :item="item" :key="item.id" @node-click="clickDeptItem" @check-click="clickDeptCheck"/>
                </div>
            </div>
            <div class="user">
                <div class="user-label">
                    部门员工：
                </div>
                <div class="user-item" :class="[{select:isSelect(item)}]" :key="item.userId"
                     v-for="item in thisDeptUserList"
                     @click="selectUser(item)">
                    {{ item.nickName }}
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped lang="scss">

.user-label,
.dept-label,
.select-list-label {
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    font-weight: bold;
}

.select-list-big-box {
    border: 1px solid #8a8a8a;
    padding: 20px;
}

.select-list {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    border-bottom: 1px solid #ebeef5;

    .select-item {
        height: 30px;
        line-height: 30px;
        padding: 0 18px 0 10px;
        border-radius: 15px;
        background-color: #f5f5f5;
        margin-right: 10px;
        margin-bottom: 10px;
        cursor: pointer;
        position: relative;

        &::after, &::before {
            content: "";
            position: absolute;
            right: 10px;
            top: 10px;
            width: 2px;
            height: 10px;
            background-color: #656565;
            transform-origin: center;
        }

        &::after {
            transform: rotate(45deg);
        }

        &::before {
            transform: rotate(-45deg);
        }

    }
}

.tree-select-box {
    height: 500px;
    width: 100%;
    display: flex;

    & > div {
        height: 100%;
        flex: 1;
        overflow: auto;
    }



    .user {
        padding: 10px 20px 10px 20px;
        border-left: 1px solid #ebeef5;
        display: flex;
        flex-direction: column;
        gap: 2px;

        .user-item {
            height: 40px;
            line-height: 40px;
            padding-left: 10px;
            cursor: pointer;

            &:hover {
                background-color: #f5f5f5;
            }

            &.select {
                background-color: #8a8a8a;
            }

        }
    }

}
</style>
