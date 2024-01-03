<template>
  <div>
    <i class="medium material-icons button-position" @click.prevent="hidePopup">close</i>
    <div class="card rules-card">
      <span>
        Welcome to our CRM application for planning and accounting of costs and income with convenient division into categories! Our application is created taking into account your needs for effective financial management and budget management.
        <br><br>
        <strong>Main functionality:</strong>
        <br><br>
        <strong>1) Budget Planning:</strong><br>
        Set cost and revenue goals and monitor plan execution. Our app will help you better understand where your finances are going.
        <br>
        <strong>2) Categories of Costs and Income:</strong><br>
        Break down your expenses and income into manageable categories to get a detailed picture of your financial health.
        <br>
        <strong>3) User-friendly Interface:</strong><br>
        A simple and intuitive interface makes it easy to use. You can quickly add and track transactions.
        <br>
        <strong>4) Reports and Analytics:</strong><br>
        Get detailed reports and analytics on your finances to help you make more informed decisions and improve your financial planning.
        <br>
        <strong>5) Security and Privacy:</strong><br>
        We value your privacy. Your financial data is kept secure, ensuring your personal information is protected.
        <br><br>
        <strong>How to start:</strong><br>
        <br>
        <strong>1) Register:</strong><br>
        Create an account to start using all the features of our CRM.
        <br>
        <strong>2) Add Transactions:</strong><br>
        Regularly add your financial transactions by specifying cost and income categories.
        <br>
        <strong>3) Analyze and Plan:</strong><br>
        View reports, analyze spending patterns, and plan your finances for the future.
        <br>
        We are confident that our CRM application will make accounting and management of your finances simpler and more efficient. Get started now!
      </span>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    hidePopup() {
      this.$emit('hide', {
        showPopup: false
      })
    }
  }
}
</script>
<style scoped lang="scss">
.button-position {
  position: absolute;
  z-index: 2;
  top: 15px;
  right: 45px;
  cursor: pointer;
}
.rules-card {
  position: absolute;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
  width: 700px;
  height: 700px;
  z-index: 1;
  padding: 50px 50px;
  overflow: auto;
}
</style>