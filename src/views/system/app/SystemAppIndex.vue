<script setup lang="ts">
// import tree from "./tree.vue";
import { systemAppIndexColumns } from "./SystemAppIndexColumns";
import { onMounted, reactive, ref } from "vue";
import { type FormInstance } from "element-plus";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { PageRequest } from "@/utils/http/iamTypes";
import { getIamAppPageList } from "@/api/iam/app";
import SystemAppAddForm from "@/views/system/app/form/SystemAppAddForm.vue";
import SystemAppEditForm from "@/views/system/app/form/SystemAppEditForm.vue";

defineOptions({
  name: "SystemAppIndex"
});

const form = reactive({
  iamApplicationName: ""
});
const dataList = ref([]);
const loading = ref(true);
const { columns } = systemAppIndexColumns();

const formRef = ref<FormInstance>();

// 引用组件
// 增
const addForm = ref<InstanceType<typeof SystemAppAddForm> | null>(null);
// 改
const editForm = ref<InstanceType<typeof SystemAppEditForm> | null>(null);

const pagination = reactive<PageRequest>({
  size: 10,
  current: 1,
  str: undefined,
  total: undefined
});

function updateList() {
  onSearch();
}

function handleUpdate(row) {
  editForm.value.openForm(row);
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
  const { data } = await getIamAppPageList(pagination, form);
  console.log("data:", data);
  dataList.value = data.records;
  pagination.total = data.total;
  loading.value = false;
}

function onAdd() {
  addForm.value?.openForm();
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
        <el-form-item label="应用名称：" prop="iamApplicationName">
          <el-input
            v-model="form.iamApplicationName"
            placeholder="应用名称"
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
        title="应用管理"
        :loading="loading"
        :dataList="dataList"
        @refresh="onSearch"
      >
        <template #buttons>
          <el-button type="primary" :icon="useRenderIcon('add')" @click="onAdd">
            新增应用
          </el-button>
        </template>
        <template v-slot="{ size, checkList }">
          <pure-table
            border
            align-whole="center"
            row-key="id"
            table-layout="auto"
            :loading="loading"
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

    <system-app-add-form ref="addForm" @updateList="updateList" />
    <system-app-edit-form ref="editForm" @updateList="updateList" />
  </div>
</template>

<style scoped lang="scss">
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}
</style>
