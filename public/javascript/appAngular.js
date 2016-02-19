/**
 * Created by Jimmy Rodriguez on 05/01/2016.
 */

angular.module('appTasks',['ui.router'])
    .config(function($stateProvider,$urlRouterProvider){

            $stateProvider
                .state('alta',{
                    url: '/alta',
                    templateUrl: '../views/alta.html',
                    controller: 'ctrlAlta'
                })


                .state('editar',{
                    url: '/editar',
                    templateUrl: '../views/editar.html',
                    controller: 'ctrlEditar'
                });

            $urlRouterProvider.otherwise('alta');

        }
    )

    //este ofrece un servicio de persistencia de datos para que cuando se recargue el navegados los datos se encuentren disponibles
    .factory('comun',function($http) {

        var comun = {}

        comun.tareas = [];//

        //variable que servira para que pueda utilizar la informacion de boton editar
        comun.tarea = {};

        //************methods remotes
        comun.getAll = function(){

            return $http.get('/tasks')
            .success(function(data){
                angular.copy(data,comun.tareas);
                //comun.tareas = data;
                return comun.tareas;
            })
        }

        comun.add = function(task){
            return $http.post('/task',task)
                .success(function(task){
                    console.log("Estoy en .success");
                    comun.tareas.push(task);

                })

        }

        comun.update = function(task){
            return $http.put('/task/'+ task._id, task)
                .success(function(data){
                    var indice = comun.tareas.indexOf(task);
                    comun.tareas[indice] = data;
                })
        }

        comun.delete = function(task){
            return $http.delete('/task/'+ task._id )
                .success(function(){
                    var indice = comun.tareas.indexOf(task);
                    comun.tareas.splice(indice,1);
                })
        }
        return comun;
    })

    .controller('ctrlAlta',function($scope,$state, comun){

        $scope.tarea = {}
        //$scope.tareas = [];

        comun.getAll();

        $scope.tareas = comun.tareas;

        $scope.prioridades = ['Low','Middle','Higth'];

        $scope.addTask = function(){
            comun.add({
                nombre: $scope.tarea.nombre,
                prioridad: parseInt($scope.tarea.prioridad)
            })

            $scope.tarea.nombre = '';
            $scope.tarea.prioridad = '';

        }

        $scope.morePriority = function(tarea){

            tarea.prioridad += 1;

        }

        $scope.lessPriority = function(tarea){

            tarea.prioridad -= 1;

        }

        $scope.delete = function(tarea){

           /* var indice = $scope.tareas.indexOf(tarea);
            $scope.tareas.splice(indice,1);
            */
            comun.delete(tarea);
        }

        $scope.procesaObjeto = function(tarea){

            comun.tarea = tarea;
            $state.go('editar');
        }
    })

    .controller('ctrlEditar',function($scope,$state,comun){
        $scope.tarea = comun.tarea;

        $scope.updateEdit = function(){

           comun.update($scope.tarea);

            $state.go('alta');

        }

        $scope.deleteEdit = function(){
            comun.delete($scope.tarea);
            $state.go('alta');

        }


    })


