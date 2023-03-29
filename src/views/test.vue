<template>
  <form name="payForm" ref="payForm">
    <table>
      <tr>
        <th><span>결제 수단</span></th>
        <td><input type="text" name="PayMethod" ref="PayMethod" v-model="requestParams.payMethod"></td>
      </tr>
      <tr>
        <th><span>결제 상품명</span></th>
        <td><input type="text" name="GoodsName" ref="GoodsName" v-model="requestParams.goodsName"></td>
      </tr>
    </table>
	<button @click="nicepayStart()">요 청</button>
  </form>
</template>

<script>

export default {
    name: 'NicePay',
    data() {
      return {
        requestParams: {
          payMethod: 'BANK',
          goodsName: '테스트상품명',
        },
      }
    },
    methods: {
      nicepayStart() {
        goPay(document.payForm)
      },
    },

}
</script>