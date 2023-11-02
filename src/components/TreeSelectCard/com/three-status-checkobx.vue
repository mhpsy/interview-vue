<script>
export default {
  name: 'three-status-checkbox',
  props: {
    value: {
      type: String,
    },
  },
  emits: ['click-check-box'],
  methods: {
    clickCheckBox() {
      this.$emit('click-check-box')
    }
  },
  computed: {
    statusStyle: function () {
      if (this.value === "all") {
        return "all";
      } else if (this.value === "half") {
        return "half";
      } else {
        return "zero";
      }
    }
  }
}

</script>

<template>
  <div @click.stop="clickCheckBox" class="three-status-box">
    <div class="inner-item" :class="statusStyle">
      <div class="inner-item-inner"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.three-status-box {
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: relative;
  margin-right: 5px;
  top: 8px;

  .inner-item {
    width: 100%;
    height: 100%;
    border-radius: 2px;
    border-color: #409eff;
  }

  .all{
    background-color: #409eff;
  }

  .all::after {
    content:"";
    display: block;
    height: 15px;
    width: 7px;
    position: absolute;
    left: 7px;
    top: 0;
    border:1px solid #fff;
    border-left: 0;
    border-top: 0;
    transform: rotate(45deg);
    transform-origin: center;
  }

  .half{
    background-color: #409eff;
  }

  .half::after {
    content:"";
    display: block;
    height: 15px;
    width: 10px;
    position: absolute;
    left: 5px;
    top: -3px;
    border:2px solid #fff;
    border-left: 0;
    border-top: 0;
    border-right: 0;
  }

  .zero {
    border-radius: 2px;
    border:1px solid #409eff;
  }

}


</style>
