<template>
  <h2>NicePay 결제 API</h2>
  <form name="payForm" method="post" action="localhost:8080/NicePayResult">
    <table>
      <tr>
        <th><span>결제 수단</span></th>
        <td><input type="text" name="PayMethod" v-model="requestParams.payMethod"></td>
      </tr>
      <tr>
        <th><span>결제 상품명</span></th>
        <td><input type="text" name="GoodsName" v-model="requestParams.goodsName"></td>
      </tr>
      <tr>
        <th><span>결제 상품금액</span></th>
        <td><input type="text" name="Amt" v-model="requestParams.amt"></td>
      </tr>				
      <tr>
        <th><span>상점 아이디</span></th>
        <td><input type="text" name="MID" v-model="requestParams.mid"></td>
      </tr>	
      <tr>
        <th><span>상품 주문번호</span></th>
        <td><input type="text" name="Moid" v-model="requestParams.moid"></td>
      </tr> 
      <tr>
        <th><span>구매자명</span></th>
        <td><input type="text" name="BuyerName" v-model="requestParams.buyerName"></td>
      </tr>	 
      <tr>
        <th>구매자명 이메일</th>
        <td><input type="text" name="BuyerEmail" v-model="requestParams.buyerEmail"></td>
      </tr>			
      <tr>
        <th><span>구매자 연락처</span></th>
        <td><input type="text" name="BuyerTel" v-model="requestParams.buyerTel"></td>
      </tr>	 
      <tr>
        <th><span>인증완료 결과처리 URL<!-- (모바일 결제창 전용)PC 결제창 사용시 필요 없음 --></span></th>
        <td><input type="text" name="ReturnURL" v-model="requestParams.returnURL"></td>
      </tr>
      <tr>
        <th>가상계좌입금만료일(YYYYMMDD)</th>
        <td><input type="text" name="VbankExpDate" v-model="requestParams.vBankExpDate"></td>
      </tr>
      <tr>
        <th>SignData</th>
        <td>{{ this.staticParams.signData }}</td>
      </tr>		
					
      <!-- 옵션 --> 
      <input type="hidden" name="GoodsCl" v-model="optionParams.goodsCl"/>						<!-- 상품구분(실물(1),컨텐츠(0)) -->
      <input type="hidden" name="TransType" v-model="optionParams.transType"/>					<!-- 일반(0)/에스크로(1) --> 
      <input type="hidden" name="CharSet" v-model="optionParams.charSet"/>					<!-- 응답 파라미터 인코딩 방식 -->
      <input type="hidden" name="ReqReserved" v-model="optionParams.reqReserved"/>					<!-- 상점 예약필드 -->
            
      <!-- 변경 불가능 -->
      <input type="hidden" name="EdiDate" v-model="staticParams.ediDate"/>			<!-- 전문 생성일시 -->
      <input type="hidden" name="SignData" v-model="staticParams.signData"/>	<!-- 해쉬값 -->
	  </table>
    <br>
	  <button @click="nicepayStart()">요 청</button>
  </form>
</template>

<script>
/* eslint-disable */

export default {
    inject: ['callApi'],
    name: 'NicePay',
    components: {
        
    },
    data() {
      return {
        requestParams: {
          payMethod: '',
          goodsName: '',
          amt: '',
          mid: '',
          moid: '',
          buyerName: '',
          buyerEmail: '',
          buyerTel: '',
          returnURL: '',
        },
        optionParams: {
          goodsCl: '1',
          transType: '0',
          charSet: 'utf-8',
          reqReserved: '',
        },
        staticParams: {
          ediDate: '',
          signData: '',
        },
        userPlatform: '',
      }
    },
    created() {
      this.callApi.get('/payFormInit')
        .then(res => {
          this.requestParams.goodsName = res.data.goodsName
          this.requestParams.amt = res.data.price
          this.requestParams.mid = res.data.mid
          this.requestParams.moid = res.data.moid
          this.requestParams.buyerName = res.data.buyerName
          this.requestParams.buyerEmail = res.data.buyerEmail
          this.requestParams.buyerTel = res.data.buyerTel
          this.requestParams.returnURL = res.data.returnURL
          this.staticParams.ediDate = res.data.ediDate
          this.staticParams.signData = res.data.signData
        })
        .catch(err => {
          console.log(err)
        })
    },
    mounted() {

    },
    methods: {
      //결제창 최초 요청시 실행됩니다.
      nicepayStart() {
        console.log("nicepayStart 메서드 호출")
        // if(checkPlatform(window.navigator.userAgent) == "mobile"){//모바일 결제창 진입
        //   console.log("모바일 결제창 진입")
        //   document.payForm.action = "https://web.nicepay.co.kr/v3/v3Payment.jsp";
        //   document.payForm.acceptCharset="euc-kr";
        //   document.payForm.submit();
        // }else{//PC 결제창 진입
        //   console.log("PC 결제창 진입")
        //   goPay(document.payForm);
        // }
        goPay(document.payForm);
      },

      //[PC 결제창 전용]결제 최종 요청시 실행됩니다. <<'nicepaySubmit()' 이름 수정 불가능>>
      nicepaySubmit(){
        document.payForm.submit();
        // router.push({
        //   name: 'NicePayResult',
        //   // query: {
        //   //   AuthResultCode: '',
        //   //   AuthResultMsg: '',
        //   //   AuthToken: '',
        //   //   PayMethod: this.requestParams.payMethod,
        //   //   MID: this.requestParams.mid,
        //   //   Moid: this.requestParams.moid,
        //   //   Signature: this.staticParams.signData,
        //   //   Amt: this.requestParams.amt,
        //   //   ReqReserved: this.optionParams.reqReserved,
        //   //   TxTid: '',
        //   //   NextAppURL: '',
        //   //   NetCancelURL: '',
        //   // },
        // })
      },

      //[PC 결제창 전용]결제창 종료 함수 <<'nicepayClose()' 이름 수정 불가능>>
      nicepayClose() {
        alert("결제가 취소 되었습니다");
      },

      //pc, mobile 구분(가이드를 위한 샘플 함수입니다.)
      checkPlatform(ua) {
        if(ua === undefined) {
          ua = window.navigator.userAgent;
        }
        
        ua = ua.toLowerCase();
        var platform = {};
        var matched = {};
        this.userPlatform = "pc";
        var platform_match = /(ipad)/.exec(ua) || /(ipod)/.exec(ua) 
          || /(windows phone)/.exec(ua) || /(iphone)/.exec(ua) 
          || /(kindle)/.exec(ua) || /(silk)/.exec(ua) || /(android)/.exec(ua) 
          || /(win)/.exec(ua) || /(mac)/.exec(ua) || /(linux)/.exec(ua)
          || /(cros)/.exec(ua) || /(playbook)/.exec(ua)
          || /(bb)/.exec(ua) || /(blackberry)/.exec(ua)
          || [];
        
        matched.platform = platform_match[0] || "";
        
        if(matched.platform) {
          platform[matched.platform] = true;
        }
        
        if(platform.android || platform.bb || platform.blackberry
            || platform.ipad || platform.iphone 
            || platform.ipod || platform.kindle 
            || platform.playbook || platform.silk
            || platform["windows phone"]) {
          this.userPlatform = "mobile";
        }
        
        if(platform.cros || platform.mac || platform.linux || platform.win) {
          this.userPlatform = "pc";
        }
      },
    },

}
</script>