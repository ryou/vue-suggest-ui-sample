<template>
  <div class="Home">
    <Suggest
      :items="suggest.items"
      @changeKeyword="fetchSuggestion"
      @selectItem="moveToItemDetailPage"
    />
  </div>
</template>

<script>
import Suggest from '@/components/Suggest'

import apiService from '@/services/ApiService'

export default {
  name: 'Home',
  components: {
    Suggest,
  },
  data() {
    return {
      suggest: {
        currentSearchKeyword: null,
        items: [],
      },
    }
  },
  methods: {
    async fetchSuggestion(keyword) {
      if (keyword === '') {
        this.suggest.items = []
        return
      }

      this.suggest.currentSearchKeyword = keyword
      const items = await apiService.fetchSuggestions(keyword)

      // 通信結果が帰ってくる前に検索キーワードが変更さた時対策
      // TODO: この処理はどちらかというとSuggestコンポーネントが持つべき処理な気がする
      if (this.suggest.currentSearchKeyword !== keyword) {
        return
      }

      this.suggest.items = items.map(item => {
        return {
          name: item.item_name,
          data: item,
        }
      })
    },
    moveToItemDetailPage(itemData) {
      this.$router.push({
        name: 'item',
        params: {
          id: String(itemData.item_id),
        },
      })
    },
  },
}
</script>
