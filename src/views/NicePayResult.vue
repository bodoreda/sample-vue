<template>
  <table>
    <tr>
        <th>결과 내용</th>
        <td>{{ResultMsg}}</td>
    </tr>
    <tr>
        <th>결제수단</th>
        <td>{{PayMethod}}</td>
    </tr>
    <tr>
        <th>상품명</th>
        <td>{{GoodsName}}</td>
    </tr>
    <tr>
        <th>결제 금액</th>
        <td>{{Amt}}</td>
    </tr>
    <tr>
        <th>거래 번호</th>
        <td>{{TID}}</td>
    </tr>
    <tr>
        <th>승인 Signature</th>
        <td>{{Signature}}</td>
    </tr>
    <tr>
        <th>생성 Signature</th>
        <td>{{paySignature}}</td>
    </tr>
  </table>
  <p>*테스트 아이디인경우 당일 오후 11시 30분에 취소됩니다.</p>
</template>

<script>
export default {
    name: 'NicePayResult',
    components: {
        
    },
    data() {
      return {
        
      }
    },
    created() {

    },
    mounted() {

    },
    methods: {
      
    },

}
</script>