angular.module('app')
  .filter('durationTimeByMinutes', function() {
    return (data) => {
      if (data >= 60) {
        return `${parseInt(data / 60)} horas`
      } else {
        return `${parseInt(data)} minutos`
      }
    }
  })
  .filter('phone', function() {
    return function(input) {
      var str = input+ ''
          str = str.replace(/\D/g,'')
          if(str.length === 11 ){
          str=str.replace(/^(\d{2})(\d{5})(\d{4})/,'($1) $2-$3')
        }else{
        str=str.replace(/^(\d{2})(\d{4})(\d{4})/,'($1) $2-$3')
        }
      return str
    }
  })