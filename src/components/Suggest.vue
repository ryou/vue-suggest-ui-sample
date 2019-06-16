<template>
  <div class="Suggest">
    <div class="Suggest_input">
      <input v-model="keyword" type="text" class="Input" />
    </div>
    <div class="Suggest_list" :class="{ '-loading': isLoading }">
      <!-- eslint-disable-next-line -->
      <div v-for="item in items" class="Suggest_listItem" @click="selectItem(item)">{{ item.name }}</div>

      <div class="Suggest_loading"><Spinner /></div>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import Spinner from '@/components/Spinner'

export default {
  name: 'Suggest',
  components: { Spinner },
  props: {
    /**
     * itemsは以下の形式になっている必要がある
     * [
     *  {
     *    name: '候補に表示される文字列',
     *    data: {
     *        ~
     *    }
     *  }
     * ]
     *
     * dataキーは候補が選択された際に親に渡すデータ
     */
    items: {
      type: Array,
      default: () => [],
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      keyword: '',
    }
  },
  watch: {
    keyword() {
      this.debouncedEmitChangeKeyword()
    },
  },
  created() {
    // 連続で文字入力された際に大量にAPIが発行されると負荷が大きいので、少しだけ間引く
    // https://jp.vuejs.org/v2/guide/computed.html#%E3%82%A6%E3%82%A9%E3%83%83%E3%83%81%E3%83%A3
    this.debouncedEmitChangeKeyword = debounce(this.emitChangeKeyword, 200)
  },
  methods: {
    selectItem(item) {
      this.$emit('selectItem', item.data)
    },
    emitChangeKeyword() {
      this.$emit('changeKeyword', this.keyword)
    },
  },
}
</script>

<style lang="scss" scoped>
$listItemHeight: 45px;
$maxListItemNum: 5;

.Suggest {
  position: relative;
}
.Suggest_input {
}
.Suggest_list {
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;

  max-height: $listItemHeight * $maxListItemNum;
  overflow-y: auto;
  overflow-x: hidden;

  box-shadow: rgba(0, 0, 0, 0.15) 0 5px 5px;

  &:not(.-loading) {
    .Suggest_loading {
      opacity: 0;
      pointer-events: none;
    }
  }
  &.-loading {
    min-height: $listItemHeight;
    .Suggest_listItem {
      opacity: 0.3;
    }
  }
}
.Suggest_listItem {
  font-size: 16px;
  line-height: $listItemHeight;
  padding: 0 10px;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  cursor: pointer;

  &:hover {
    background-color: #ecf0f1;
  }
}
.Suggest_loading {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

input.Input {
  font-size: 16px;

  padding: 10px;
  width: 100%;
  border: 1px solid #bdc3c7;
  box-sizing: border-box;

  &:focus {
    outline: 2px solid rgba(#3498db, 0.5);
  }
}
</style>
