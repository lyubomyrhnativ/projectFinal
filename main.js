//створюєм модуль та контролер
var module=angular.module("mainApp",[]);
module.controller("mainCtrl",function($scope, $http){
  
  $scope.users=model;
  console.log($scope.users)

  $scope.current={
    view:"users.html",
    header:"Слухачі",
    user:{},
    username:"",
    course:""
  }

  //завантаження даних
  $scope.loadData=function(){
    $http.get('/loaddata').then(function(data){
      console.log(data);
      $scope.users=data.data;
    })
  }
 // $scope.loadData();
  

  $scope.showUsers=function(){
    $scope.current.view="users.html";
    $scope.current.header="Cлухачі";
  }

  $scope.showCourses=function(user){
    console.log("user:");
    console.log(user)
    $scope.current.view="courses.html";
    $scope.current.header="Курси";
    $scope.current.user=user;
  }

  // метод: додавання нового слухача
  $scope.addUser=function(name){
    if(!name) return;
    var user={
      user:name,
      courses:[]
    };

   $scope.users.push(user);
   $scope.current.username=""
   /*
      $http.post('/adduser',user).then(function(data){
      console.log(data);
      if(!data.data)
      alert("Такий слухач вже існує!");
      else
      $scope.loadData();
      $scope.current.username="";
      })
   */
  }

  // метод: видалення існуючого слухача
  $scope.deleteUser=function(user){
    var pos=$scope.users.indexOf(user);
    $scope.users.splice(pos,1);
    /*
    $http.post('/deleteuser',{id:user._id}).then(function(data){
      console.log(data.data);
      $scope.loadData();
    })
    */
  }

  // метод: додавання слухачу нового курсу
  $scope.addCourse=function(name,user){
    if(!name) return;
    var courses=user.courses;
    for(var i=0;i<courses.length;i++)
      if(courses[i].name==name){
        alert('Даний курс вже існує!');
        $scope.current.course="";
        return;
      }
    var course={
      name:name,
      bool:false
      }
    var obj={
      id:user._id,
      course:course
      };

    $scope.current.user.courses.push(course);
    $scope.current.course="";
    /*
    $http.post('/addcourse',obj).then(function(data){
      console.log(data.data);
      $scope.current.user.courses.push(course);
      $scope.current.course="";
    })
    */
    
  }

  // метод: додавання ідентифікатора курсу(пройдений/непройдений)
  $scope.checkCourse=function(course,user){
    var obj={
      id:user._id,
      course:course
    }
    /*
    $http.post('/checkcourse',obj).then(function(data){
      console.log(data.data);
    })
    */
  }

  // метод: знищення курсу
  $scope.deleteCourse=function(course,user){
    var obj={
      id:user._id,
      course:course
    }

    var courses=$scope.current.user.courses;
    var poscourse=courses.indexOf(course);
    courses.splice(poscourse,1);
    /*
    $http.post('/deletecourse',obj).then(function(data){
      console.log(data);
      var courses=$scope.current.user.courses;
      var poscourse=courses.indexOf(course);
      courses.splice(poscourse,1);
    })
    */

  }
})
