<script setup lang="ts">
import { ref } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { updateIamApp } from "@/api/iam/app";
import { cloneDeep } from "lodash-unified";

defineOptions({
  name: "SystemAppEditForm"
});

const formData = ref({
  iamApplicationName: undefined,
  iamApplicationAvatar: undefined,
  iamApplicationDescription: undefined,
  iamApplicationTenantSwitch: false,
  state: "启用"
});

const appEditFormRef = ref<FormInstance>();

const formShow = ref(false);

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async valid => {
    if (valid) {
      console.log("formData:", formData.value);

      try {
        await updateIamApp(formData.value);
        ElMessage.success("提交成功");
        emit("updateList");
        formShow.value = false;
        resetForm(formEl);
      } catch (e) {
        ElMessage.error(`提交失败${e}`);
      }
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  formData.value = {
    iamApplicationName: undefined,
    iamApplicationAvatar: undefined,
    iamApplicationDescription: undefined,
    iamApplicationTenantSwitch: false,
    state: "启用"
  };
};

const closeDialog = () => {
  formShow.value = false;
  resetForm(appEditFormRef.value);
};

const emit = defineEmits(["updateList"]);

const openForm = function (row) {
  formData.value = cloneDeep(row);
  formShow.value = true;
};

// 暴露组件内容
defineExpose({
  openForm
});

const rules = {
  iamApplicationName: [
    { required: true, message: "请输入应用名称", trigger: "blur" }
  ],
  iamApplicationDescription: [
    { required: true, message: "请输入应用描述", trigger: "blur" }
  ]
};
</script>

<template>
  <el-dialog
    v-model="formShow"
    title="新建产品"
    :width="680"
    draggable
    :before-close="closeDialog"
  >
    <!-- 表单内容 -->
    <el-form
      ref="appEditFormRef"
      :model="formData"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="应用名称" prop="iamApplicationName">
        <el-input
          v-model="formData.iamApplicationName"
          :style="{ width: '480px' }"
          placeholder="请输入应用名称"
        />
      </el-form-item>

      <el-form-item label="应用ICON" prop="name">
        <el-input
          v-model="formData.iamApplicationAvatar"
          :style="{ width: '480px' }"
          placeholder="请输入应用ICON"
        />
      </el-form-item>
      <el-form-item label="产品状态" prop="state">
        <el-radio-group v-model="formData.state">
          <el-radio label="停用">停用</el-radio>
          <el-radio label="启用">启用</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="开启多租户" prop="iamApplicationTenantSwitch">
        <el-radio-group v-model="formData.iamApplicationTenantSwitch">
          <el-radio label="false">否</el-radio>
          <el-radio label="true">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="应用描述" prop="iamApplicationDescription">
        <el-input
          v-model="formData.iamApplicationDescription"
          :style="{ width: '480px' }"
          placeholder="请输入应用描述"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="submitForm(appEditFormRef)">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>
