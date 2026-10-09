<template>
    <div class="attr-list attr-empty">
        <p class="attr-tip">文字组件：右键可「编辑」或「删除」</p>
    </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.attr-empty {
    padding: 0;
    display: flex;
    align-items: center;
    height: 100%;

    .attr-tip {
        margin: 0;
        font-size: 13px;
        color: #909399;
        line-height: 1;
        white-space: nowrap;
    }
}
</style>
