import { ref } from 'vue';

import { defineStore } from 'pinia';

export interface ITabItem {
  app?: string
  page?: string
  title?: string
}

export const useTabStore = defineStore('tab', () => {
  const list = ref<ITabItem[]>([])

  const active = ref<ITabItem>({})

  function _open_by_tab_itemen(tab: ITabItem) {
    if (isTabExist(tab)) {
      active.value = findTabByAppAndPage(tab)
      return
    }
    if (tab.app && tab.page && tab.title) {
      list.value.push(tab)
      active.value = tab
    }
  }

  function _open_by_string(_page: string) {
    const [app, page] = _page.split('/')
    const title = `${app}-${page}`
    open({ app, page, title })
  }

  function open(tab: ITabItem | string) {
    if (typeof tab === 'string') {
      _open_by_string(tab)
      return
    }
    _open_by_tab_itemen(tab)
  }

  function close(tab: ITabItem) {
    remove(tab)
    if (active.value.app === tab.app && active.value.page === tab.page) {
      active.value = list.value[list.value.length - 1] || {}
    }
  }
  function findTabByAppAndPage(tab: ITabItem) {
    return list.value.find((item) => item.app === tab.app && item.page === tab.page) || {}
  }

  function isTabExist(tab: ITabItem) {
    return list.value.some((item) => item.app === tab.app && item.page === tab.page)
  }

  function remove(tab: ITabItem) {
    list.value = list.value.filter((item) => item.app !== tab.app || item.page !== tab.page)
  }

  return { list, active, open, close }
})
