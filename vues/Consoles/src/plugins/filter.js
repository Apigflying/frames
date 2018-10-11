/* vue filter */
import Vue from 'vue';

Vue.filter('money', (value, divide) => {
  if (isNaN(value) || value === null) {
    return '--';
  }
  return (+value / (divide || 100)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
});
