<template>
  <table>
    <tr>
        <th>결과 내용</th>
        <td>{{resultParams.ResultMsg}}</td>
    </tr>
    <tr>
        <th>결제수단</th>
        <td>{{resultParams.PayMethod}}</td>
    </tr>
    <tr>
        <th>상품명</th>
        <td>{{resultParams.GoodsName}}</td>
    </tr>
    <tr>
        <th>결제 금액</th>
        <td>{{resultParams.Amt}}</td>
    </tr>
    <tr>
        <th>거래 번호</th>
        <td>{{resultParams.TID}}</td>
    </tr>
    <tr>
        <th>승인 Signature</th>
        <td>{{resultParams.Signature}}</td>
    </tr>
    <tr>
        <th>생성 Signature</th>
        <td>{{resultParams.paySignature}}</td>
    </tr>
  </table>
  <p>*테스트 아이디인경우 당일 오후 11시 30분에 취소됩니다.</p>
</template>

<script>
export default {
    inject: ['callApi'],
    name: 'NicePayResult',
    components: {
        
    },
    data() {
      return {
        resultParams: {
            ResultCode: '',
            ResultMsg: '',
            PayMethod: '',
            GoodsName: '',
            Amt: '',
            TID: '',
            Signature: '',
            paySignature: '',
        }
      }
    },
    created() {
        this.callApi.post('/callback')
            .then(res => {
                this.resultParams.ResultCode = res.data.ResultCode
                this.resultParams.ResultMsg = res.data.ResultMsg
                this.resultParams.PayMethod = res.data.PayMethod
                this.resultParams.GoodsName = res.data.GoodsName
                this.resultParams.Amt = res.data.Amt
                this.resultParams.TID = res.data.TID
                this.resultParams.Signature = res.data.Signature
                this.resultParams.paySignature = res.data.paySignature
            })
            .catch(err => {
                console.log(err)
            })
    },
    mounted() {

    },
    methods: {
      
    },

}
</script>