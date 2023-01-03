<script setup lang="ts">
// import tree from "./tree.vue";
import { systemUserIndexColumns } from "./system_user_index_columns";
import { onMounted, reactive, ref } from "vue";
import { type FormInstance } from "element-plus";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { getIamUserPageList } from "@/api/iam/user";
import { PageRequest } from "@/utils/http/iamTypes";
import { PureTableBar } from "@/components/RePureTableBar";

defineOptions({
  name: "SystemUserIndex"
});

const form = reactive({
  iamUserName: "",
  iamUserMobile: "",
  state: ""
});
const dataList = ref([]);
const loading = ref(true);
const { columns } = systemUserIndexColumns();

const formRef = ref<FormInstance>();

const pagination = reactive<PageRequest>({
  size: 10,
  current: 1,
  str: undefined,
  total: undefined
});

function handleUpdate(row) {
  console.log(row);
}

function handleDelete(row) {
  console.log(row);
}

function handleCurrentChange(val: number) {
  console.log(`current page: ${val}`);
}

function handleSizeChange(val: number) {
  console.log(`${val} items per page`);
}

function handleSelectionChange(val) {
  console.log("handleSelectionChange", val);
}

async function onSearch() {
  loading.value = true;
  const { data } = await getIamUserPageList(pagination, form);
  dataList.value = data.records;
  pagination.total = data.total;
  loading.value = false;
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  onSearch();
};

onMounted(() => {
  onSearch();
});
</script>

<template>
  <div class="main flex">
    <div class="flex-1 ml-4 mt-4">
      <el-form
        ref="formRef"
        :inline="true"
        :model="form"
        class="bg-bg_color w-[99/100] pl-8 pt-4"
      >
        <el-form-item label="用户名称：" prop="username">
          <el-input
            v-model="form.iamUserName"
            placeholder="请输入用户名称"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :icon="useRenderIcon('search')"
            :loading="loading"
            @click="onSearch"
          >
            搜索
          </el-button>
          <el-button
            :icon="useRenderIcon('refresh')"
            @click="resetForm(formRef)"
          >
            重置
          </el-button>
        </el-form-item>
      </el-form>

      <PureTableBar
        title="用户管理"
        :loading="loading"
        :dataList="dataList"
        @refresh="onSearch"
      >
        <template #buttons>
          <el-button type="primary" :icon="useRenderIcon('add')">
            新增用户
          </el-button>
        </template>
        <template v-slot="{ size, checkList }">
          <pure-table
            border
            align="center"
            table-layout="auto"
            :size="size"
            :data="dataList"
            :columns="columns"
            :checkList="checkList"
            :pagination="pagination"
            :paginationSmall="size === 'small' ? true : false"
            :header-cell-style="{
              background: 'var(--el-table-row-hover-bg-color)',
              color: 'var(--el-text-color-primary)'
            }"
            @selection-change="handleSelectionChange"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
            <template #operation="{ row }">
              <el-button
                class="reset-margin"
                link
                type="primary"
                :size="size"
                @click="handleUpdate(row)"
                :icon="useRenderIcon('edit')"
              >
                修改
              </el-button>
              <el-popconfirm title="是否确认删除?">
                <template #reference>
                  <el-button
                    class="reset-margin"
                    link
                    type="primary"
                    :size="size"
                    :icon="useRenderIcon('delete')"
                    @click="handleDelete(row)"
                  >
                    删除
                  </el-button>
                </template>
              </el-popconfirm>
              <el-dropdown>
                <el-button
                  class="ml-3"
                  link
                  type="primary"
                  :size="size"
                  @click="handleUpdate(row)"
                  :icon="useRenderIcon('more')"
                />
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>
                      <el-button
                        class="reset-margin !h-[20px] !text-gray-500 dark:!text-white dark:hover:!text-primary"
                        link
                        type="primary"
                        :size="size"
                        :icon="useRenderIcon('password')"
                      >
                        重置密码
                      </el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button
                        class="reset-margin !h-[20px] !text-gray-500 dark:!text-white dark:hover:!text-primary"
                        link
                        type="primary"
                        :size="size"
                        :icon="useRenderIcon('role')"
                      >
                        分配角色
                      </el-button>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
          </pure-table>
        </template>
      </PureTableBar>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}
</style>
