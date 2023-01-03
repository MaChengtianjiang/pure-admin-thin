import { ref } from "vue";
import dayjs from "dayjs";
import { ElMessageBox } from "element-plus";
import { changeStateIamApp } from "@/api/iam/app";
import { message } from "@/utils/message";

export function systemAppIndexColumns() {
  const switchLoadMap = ref({});

  const columns = ref([
    {
      type: "selection",
      width: 55,
      hide: ({ checkList }) => !checkList.includes("勾选列")
    },
    // {
    //   label: "序号",
    //   type: "index",
    //   width: 70,
    //   hide: ({ checkList }) => !checkList.includes("序号列")
    // },
    {
      label: "应用id",
      prop: "id"
    },
    {
      label: "应用代号",
      prop: "iamApplicationCode"
    },
    {
      label: "应用名称",
      prop: "iamApplicationName"
    },
    {
      label: "应用头像",
      prop: "iamApplicationAvatar"
    },
    {
      label: "应用描述",
      prop: "iamApplicationDescription"
    },
    {
      label: "是否开启多租户",
      prop: "iamApplicationTenantSwitch"
    },
    {
      label: "状态",
      prop: "state",
      width: 130,
      cellRenderer: scope => (
        <el-switch
          size={scope.props.size === "small" ? "small" : "default"}
          loading={switchLoadMap.value[scope.index]?.loading}
          v-model:checked={scope.row.state}
          checkedValue={"启用"}
          unCheckedValue={"停用"}
          checked-children="启用"
          un-checked-children="停用"
          onChange={() => onChange(scope)}
        />
      )
    },
    {
      label: "创建时间",
      width: 180,
      prop: "createTime",
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      fixed: "right",
      width: 180,
      slot: "operation"
    }
  ]);

  function onChange({ row, index }) {
    ElMessageBox.confirm(
      `确认要<strong>${
        row.state === "停用" ? "停用" : "启用"
      }</strong><strong style='color:var(--el-color-primary)'>${
        row.iamApplicationName
      }</strong>应用吗?`,
      "系统提示",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        dangerouslyUseHTMLString: true,
        draggable: true
      }
    )
      .then(async () => {
        switchLoadMap.value[index] = Object.assign(
          {},
          switchLoadMap.value[index],
          {
            loading: true
          }
        );

        await doChange(row, index);
      })
      .catch(() => {
        row.state === "停用" ? (row.state = "启用") : (row.state = "停用");
      });
  }

  async function doChange(row, index) {
    try {
      const state = row.state === "停用" ? "OFF" : "ON";
      await changeStateIamApp([row.id], state);
      switchLoadMap.value[index] = Object.assign(
        {},
        switchLoadMap.value[index],
        {
          loading: false
        }
      );
      message("已成功修改应用状态", {
        type: "success"
      });
    } catch (e) {
      message(`修改应用状态失败${e}`, {
        type: "error"
      });
    }
  }

  return {
    columns
  };
}
