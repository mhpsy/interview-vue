<script setup lang="ts">
import TreeSelectCard from "@/components/TreeSelectCard/index.vue";
import {computed, ref, watch} from "vue";
import {createTree, generateUsersFromTree, Node, User} from "@/utils";

const personIdOptions = ref<any[]>([]);

const useDeptTree = createTree(3) as Node

const userList = ref<User[]>([])

generateUsersFromTree(useDeptTree, userList.value)

const deptTree = ref<Node[]>([useDeptTree])

const personList = ref<number[]>([])

const show = ref(true)

const openAndCloseQuestions = () => {
    show.value = !show.value
}

const openAndCloseBtnName = computed(() => {
    return show.value ? '收起示例数据' : '展开示例数据'
})

</script>

<template>
    <main>
        <div class="questions">
            <div class="title">
                <div style="margin-bottom: 10px;">
                   1. 有以下两个数组,
                    左边是部门的树状数据，
                    右边是全部的用户的信息，
                    你需要根据这两个数组做一个组件，
                    这个组件的功能和样式就是下面的样子。
                </div>
                <div style="margin-bottom: 10px;">
                   2. 请尽可能详细的讲述你的思路和想法，
                    可以提到一些需要注意的地方，
                    可以讲一些细节，
                    比如如何处理这个树状结构。
                </div>
                <div style="margin-bottom: 10px;">
                   3. 下面的组件可以点击，可以选择，可以全选，可以取消全选。
                    可以选择单个部门，也可以选择多个部门。
                    可以选择单个用户，也可以取消选择单个用户。
                </div>
            </div>
            <a @click="openAndCloseQuestions" class="questions-btn">
                {{ openAndCloseBtnName }}
            </a>
            <div v-if="show" class="context">
                <div class="dept-example">
            <pre>
    [{
        "id": 100,
        "label": "A科技",
        "children": [
            {
                "id": 101,
                "label": "B科技",
                "children": [
                    {
                        "id": 102,
                        "label": "C科技",
                        "children": []
                    },
                    {
                        "id": 103,
                        "label": "D科技",
                        "children": []
                    }
                ]
            }
        ]
    }]
            </pre>
                </div>
                <div class="user-example">
<pre>
    [
        {
            "userId": 104,
            "nickName": "张三",
            "deptId": 100,
            "deptName": "A科技"
        },
        {
            "userId": 105,
            "nickName": "李四",
            "deptId": 101,
            "deptName": "B科技"
        },
        {
            "userId": 106,
            "nickName": "王五",
            "deptId": 101,
            "deptName": "B科技"
        },
        {
            "userId": 107,
            "nickName": "什么六",
            "deptId": 101,
            "deptName": "B科技"
        },
        {
            "userId": 108,
            "nickName": "什么七",
            "deptId": 101,
            "deptName": "B科技"
        },
        {
            "userId": 109,
            "nickName": "老八",
            "deptId": 102,
            "deptName": "C科技"
        },
        {
            "userId": 110,
            "nickName": "老九",
            "deptId": 102,
            "deptName": "C科技"
        },
        {
            "userId": 111,
            "nickName": "诗人",
            "deptId": 102,
            "deptName": "C科技"
        },
        {
            "userId": 112,
            "nickName": "十一",
            "deptId": 103,
            "deptName": "D肨科技"
        },
        {
            "userId": 113,
            "nickName": "十二",
            "deptId": 103,
            "deptName": "D科技"
        }
    ]
            </pre>
                </div>

            </div>

        </div>
        <div class="tree-select-card-box">
            <tree-select-card
                v-model:personList="personList"
                :user-list="userList"
                :dept-tree="deptTree"
            ></tree-select-card>
        </div>
    </main>
</template>

<style scoped lang="scss">
main {
    margin: 0  auto 50px;
    width: 80vw;
    user-select: none;

    .questions-btn {
        width: 150px;
        height: 30px;
        background-color: #409eff;
        color: #fff;
        border-radius: 5px;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
        margin-bottom: 20px;
    }

    .tree-select-card-box {
        display: grid;
    }

    .questions {
        display: flex;
        flex-direction: column;

        .title {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 20px;
            line-height: 1.5;
        }

        .context {
            display: grid;
            grid-template-columns: repeat(2, 1fr);

        }
    }

}
</style>
