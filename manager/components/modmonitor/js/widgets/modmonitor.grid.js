
/*
 Таблица элементов
 */

modMonitor.grid.RequestItems = function(config){
    config = config || {};

    // Ext.applyIf(config, {
    //     // processor: 'orders.php'
    //     // processor: 'buro/orders.php'
    //     // ,new_only: 1
    //     // ,builder:''
    //     // ,items:[]
    // });


    Ext.applyIf(config, {
        url: modMonitor.config.connector_url
        ,baseParams: {
            action: config.action || 'requests/items/getData'
            ,request_id: config.request_id
            ,format: 'grid'
        }
        // ,save_action: 'companies/contracts/services/UpdateFromGrid'
        // ,autosave: true
        ,remoteSort: true
        ,fields: [
            'id'
            ,'request_id'
            ,'type'
            ,'name'
            ,'properties'
            ,'parent'
            ,'time'
            ,'php_memory'
            ,'db_queries'
            ,'db_queries_time'
            ,'total'
            ,'menu'
        ]
        // ,paging: true
        // ,pageSize: 10
        // ,listeners: this.getListeners()
    });

    this.config = config;

    config.tbar = this.getToolbar();

    modMonitor.grid.RequestItems.superclass.constructor.call(this,config);
};

Ext.extend(modMonitor.grid.RequestItems, MODx.grid.Grid,{


    _loadColumnModel: function(){
        // console.log(this);
        // console.log(this.store);
        this.cm = new Ext.grid.ColumnModel({
            grid: this
            ,
            defaults: {
                width: 120
                ,sortable: true
                ,editable: false
            },
            columns: [
                {
                    header: 'ID'
                    ,dataIndex: 'id'
                    ,editable: false
                    // ,hidden: true
                }
                ,{
                    header: 'Родитель'
                    ,dataIndex: 'parent'
                    // ,hidden: true
                    // ,editor: 'date'
                    // ,renderer: function(value, cell, record){
                    //     
                    //     if(value > 0.2){
                    //         cell.style = cell.style + ";color:red;";
                    //     }
                    //     
                    //     return value;
                    // }
                }
                ,{
                    header: 'ID запроса'
                    ,dataIndex: 'request_id'
                    ,editable: false
                    // ,hidden: true
                }
                // ,{
                //     header: 'Услуга'
                //     ,dataIndex: 'service_id'
                //     // ,hidden: true
                //     ,renderer: function(value, cell, record){
                //         
                //         value = record.get("service_name");
                //         
                //         return value;
                //     }
                // }
                ,{
                    header: 'Элемент'
                    ,dataIndex: 'type'
                    // ,hidden: true
                    // ,editor: 'date'
                }
                ,{
                    header: 'Имя элемента'
                    ,dataIndex: 'name'
                    // ,hidden: true
                    // ,editor: 'date'
                    ,renderer: function(value, cell, record){
                        var total = record.get('total');
                        
                        if(total > 1){
                            value = value + " <b>("+ total +")</b>";
                        }
                        
                        return value;
                    }
                }
                ,{
                    header: 'Свойства'
                    ,dataIndex: 'properties'
                }
                ,{
                    header: 'Общее время'
                    ,dataIndex: 'time'
                    // ,hidden: true
                    // ,editor: 'date'
                    ,renderer: function(value, cell, record){
                        
                        if(value > 0.2){
                            cell.style = cell.style + ";color:red;";
                        }
                        
                        return value;
                    }
                }
                ,{
                    header: 'Запросов к БД'
                    ,dataIndex: 'db_queries'
                    // ,hidden: true
                    // ,editor: 'date'
                }
                ,{
                    header: 'Время запросов к БД'
                    ,dataIndex: 'db_queries_time'
                    // ,hidden: true
                    // ,editor: 'date'
                }
                ,{
                    header: 'Использовано памяти'
                    ,dataIndex: 'php_memory'
                    // ,hidden: true
                    // ,editor: 'date'
                }
                // ,{
                //     header: 'Total'
                //     ,dataIndex: 'total'
                //     // ,hidden: true
                //     // ,editor: 'date'
                // }
                // ,{
                //     header: 'Действует До'
                //     ,dataIndex: 'date_till'
                //     // ,editor: {
                //     //     xtype: 'datepicker'
                //     // }
                //     // ,hidden: true
                // }
                // ,{
                //     header: 'Активен'
                //     ,dataIndex: 'active'
                //     ,editor: {
                //         xtype: 'combo-boolean'
                //     }
                //     ,renderer: function(value, cell, record){
                //         
                //         if(value == '1' || value == 'true'){
                //             cell.style = 'color:green;';
                //             // value = 'Да';
                //             value = '<i class="icon icon-check"></i>';
                //         }
                //         else if(value == '' || value == 'false'){
                //             cell.style = 'color:red;';
                //             value = '<i class="icon icon-close"></i>';
                //         }
                //         
                //         return value;
                //     }
                //     // ,hidden: true
                // }
            ]
            ,getCellEditor: this.getCellEditor
        });
        
        // alert(this.getCellEditor);
        // console.log(this);
        return;
    }
    
    
    ,getCellEditor: function(colIndex, rowIndex) {
        // return;
        
        // console.log(this);
        
        var xtype = 'textfield';
        var record = this.grid.store.getAt(rowIndex);
        var column = this.getColumnAt(colIndex);
        var o;
        
        if(this.grid.mainGrid){
            this.grid.mainGrid.__stopEditing = true;
        }
        
        // console.log(this);
        // return;
        
        var fieldName = this.getDataIndex(colIndex);
        
        // console.log(fieldName);
        
        // switch(fieldName){
        //     case 'date':
        //     case 'date_till':
        //         // return new Ext.form.DateField({
        //         //     // format: 'Y-m-d'
        //         //     // ,value: '2016-05-06'
        //         //     // value: '01/01/01'
        //         //     // value: new Date()
        //         // });
        //         
        //         return new Ext.grid.GridEditor(
        //             new Ext.form.DateField({
        //                 format: 'Y-m-d'
        //                 // value: '2016-05-06'
        //             })
        //         );
        //         
        //         // o = 'date';
        //         break;
        // }
        
        if(!o){
            o = MODx.load({
                xtype: xtype
            });
        } 
        
        return new Ext.grid.GridEditor(o);
    }
    
    ,getToolbar: function(){
        
        this.GroupByRequestCheckbox = new Ext.form.Checkbox({
            name: 'group_by_items'
            ,listeners: {
                check: {
                    fn: this.OnGroupByRequestCheckboxChange
                    ,scope: this
                }
            }
        });
        
        return new Ext.Toolbar({
            items: [
                this.GroupByRequestCheckbox
                ,{
                    xtype: 'label'
                    ,text: "Группировать элементы"
                }
            ]
            // items: [{
            //     xtype: 'auto'
            //     ,width: 300
            //     ,layout: 'form'
            //     ,items: [
            //         this.GroupByRequestCheckbox
            //     ]
            // }]
        });
    }
    
    ,OnGroupByRequestCheckboxChange: function(element, value){
        // console.log(element);
        // console.log(this);
        // console.log(value);
        
        value = (value === true ? 1 : 0);
        
        this.store.setBaseParam(element.name, value);
        
        if(this.config.paging){
            this.getBottomToolbar().changePage(0);
        }
        else{
            this.store.load();
        }
    }

    
    ,onUpdateSuccess: function(response){
        if(!response.success){
            MODx.msg.alert(response.message || 'Ошибка выполнения запроса');
            return false;
        }
        
        this.refresh();
        return;
    }

});

Ext.reg('modmonitor-grid-requestitems',modMonitor.grid.RequestItems);



/*
    Расширенная панель элементов запросов с фильтрами и т.п.
*/
modMonitor.grid.RequestItemsExtended = function(config){

    Ext.applyIf(config, {
        paging: true
        ,pageSize: 10
    });

    modMonitor.grid.RequestItemsExtended.superclass.constructor.call(this,config);
};

Ext.extend(modMonitor.grid.RequestItemsExtended, modMonitor.grid.RequestItems,{


});

Ext.reg('modmonitor-grid-requestitems-extended',modMonitor.grid.RequestItemsExtended);



/*
    Грид запросов с деталями по запросам
*/


modMonitor.grid.Requests = function(config){
    config = config || {};

    this._loadExpander();

    Ext.applyIf(config, {
        url: modMonitor.config.connector_url
        ,baseParams: {
            action: config.action || 'requests/getData'
            ,format: 'grid'
        }
        ,remoteSort: true
        ,fields: [
            'id'
            ,'parent'
            ,'url'
            ,'date'
            ,'context_key'
            ,'site_url'
            ,'resource_id'
            ,'http_status'
            ,'user_id'
            ,'username'
            ,'ip'
            ,'time'
            ,'php_memory'
            ,'db_queries'
            ,'db_queries_time'
            ,'from_cache'
            ,'resource_url'
            ,'menu'
        ]
        ,paging: true
        ,pageSize: 10
        ,plugins: this.expander
    });

    this.config = config;

    config.tbar = this.getToolbar();
    
    modMonitor.grid.Requests.superclass.constructor.call(this,config);
};

Ext.extend(modMonitor.grid.Requests, MODx.grid.Grid,{

    getToolbar: function(){

        this.searchField = new Ext.form.TextField({
            width: 250
            ,enableKeyEvents: true
            ,name: 'query'
            ,emptyText: "Адрес или ID. % - все символы, _ - один"
            ,listeners:{

                // При изменении
                change: {
                    fn: function(field, e){
                        if(field.isDirty()){
                            field.originalValue = field.getValue();
                            this.getStore().setBaseParam( field.name, field.getValue() );
                            this.search();
                        }
                    }
                    ,scope: this
                }
                ,keyup: {
                    fn: function(field, e){
                        // Если нажали ENTERsearchField
                        if(e.getKey() == e.ENTER){
                            field.fireEvent('change', field, e);
                        }
                    }
                    ,scope: this
                }
            }
        });

        this.timeSearchField = new Ext.form.NumberField({
            enableKeyEvents: true
            ,name: 'time'
            ,emptyText: "Время"
            ,width: 80
            ,listeners:{

                // При изменении
                change: {
                    fn: function(field, e){
                        if(field.isDirty()){
                            field.originalValue = field.getValue();
                            this.getStore().setBaseParam( field.name, field.getValue() );
                            this.search();
                        }
                    }
                    ,scope: this
                }
                ,keyup: {
                    fn: function(field, e){

                        // Если нажали ENTER
                        if(e.getKey() == e.ENTER){
                            field.fireEvent('change', field, e);
                            // this.search();
                        }
                    }
                    ,scope: this
                }
            }
        });
        
        this.cacheSearchField = new MODx.combo.ComboBox({
            name: 'from_cache'
            ,mode: 'local'
            ,emptyText: "Кеш"
            ,width: 90
            ,store: new Ext.data.SimpleStore({
                fields: ['d','v']
                ,data: [['Все', ''],['Из кеша','1'],['Не из кеша','2']]
            })
            ,displayField: 'd'
            ,valueField: 'v'
            ,listeners:{
                select: {
                    fn: function(field, value){
                        this.getStore().setBaseParam( field.name, field.getValue() );
                        this.search();
                    }
                    ,scope: this
                }
            }
            ,scope: this
        });
        
        this.contextSearchField = new MODx.combo.Context({
            name: 'context'
            ,emptyText: "Контекст"
            ,width: 110
            ,baseParams: {
                action: 'context/getlist'
                ,sort: 'key'
                ,dir: 'desc'
            }
            ,listeners:{
                select: {
                    fn: function(field, value){
                        this.getStore().setBaseParam( field.name, field.getValue() );
                        this.search();
                    }
                    ,scope: this
                }
            }
            ,scope: this
        });

        this.SearchButton = new Ext.Button({
            text: 'Найти'
            ,scope: this
            ,handler: this.search
        });

        this.ClearButton = new Ext.Button({
            text: 'Сброс'
            ,scope: this
            ,handler: this.clear
        });

        return new Ext.Toolbar({
            defaults:{
                style: "margin: 0 3px;"
            }
            ,items: [
                // {
                //     xtype: 'label'
                //     ,text: 'Поиск'
                //     ,style: 'font-size: 16px;'
                // }
                // ,
                this.searchField
                // ,{
                //     xtype: 'label'
                //     ,text: 'Время'
                //     ,style: 'font-size: 16px;'
                // }
                ,this.timeSearchField
                
                ,this.cacheSearchField
                ,this.contextSearchField
                ,this.SearchButton
                ,this.ClearButton
                ,'->'
                ,{
                    text: "Очистить"
                    ,cls: 'x-btn tree-trash'
                    ,handler: this.truncateStatistique
                    ,scope: this
                }
            ]
        });
    }
    
    
    ,clear: function(){
        
        this.searchField.setValue('');
        this.timeSearchField.setValue('');
        this.cacheSearchField.setValue('');
        this.contextSearchField.setValue('');
        
        this.getStore().setBaseParam( this.searchField.name, '' );
        this.getStore().setBaseParam( this.timeSearchField.name, '' );
        this.getStore().setBaseParam( this.cacheSearchField.name, '' );
        this.getStore().setBaseParam( this.contextSearchField, '' );
        
        // this.searchField.fireEvent('change', this.searchField);
        this.search();
    }
    
    ,search: function(){
        this.getBottomToolbar().changePage(0);
    }
    
    ,truncateStatistique: function(){
        
        MODx.msg.confirm({
          text: "Удалить всю статистику? Это безвозвратно."
          ,url: modMonitor.config.connector_url + '?action=requests/truncate'
          ,listeners: {
              success: {
                  fn: function(){
                      // console.log(this);
                      this.search();
                  }
                  ,scope: this
              }
          }
        });
    }


    ,_loadExpander: function(){
        this.expander = new Ext.ux.grid.RowExpander({
            tpl : new Ext.Template(
                '<div id="request-row-{id}"></div>'
            )
            ,listeners:{
                render: function(){
                    console.log(this);
                },
                expand: function(exp, record, body, rowIndex){
                    var id = record.get('id');
                    
                    console.log(id);
                    console.log(Ext.get('request-row-' + id));
                    
                    this.expander.Grids[id] = new modMonitor.tree.RequestsTree({
                        renderTo: Ext.get('request-row-' + id)
                        ,request_id: id
                        // ,url: this.url
                        // ,action: 'users/getlist'
                    });
                },
                scope: this
            }
            ,sortable:  false
            ,expandOnDblClick: false
        });
        this.expander.Grids = {};
        
        // console.log(this.expander);
        
        return;
    }

    ,_loadColumnModel: function(){
        
        // console.log(this.expander);
        
        this.cm = new Ext.grid.ColumnModel({
            grid: this
            ,
            defaults: {
                width: 120
                ,sortable: true
                ,editable: false
            },
            columns: [
                this.expander
                ,{
                    header: 'ID'
                    ,dataIndex: 'id'
                    ,editable: false
                    // ,hidden: true
                }
                ,{
                    header: 'Родитель'
                    ,dataIndex: 'parent'
                    // ,hidden: true
                }
                ,{
                    header: 'Контекст'
                    ,dataIndex: 'context_key'
                    ,hidden: true
                }
                ,{
                    header: 'Адрес'
                    ,dataIndex: 'url'
                    ,renderer: function(value, cell, record){
                        var resource_url = record.get('resource_url');
                        var user_id = record.get('user_id');
                        
                        if(resource_url !== '' && resource_url !== null){
                            value = '<a href="'+ resource_url +'" target="_blank" style="display:inline-block;padding-right: 10px;">'+ value +'</a>';
                        }
                        
                        if(user_id !== '' && user_id !== null && user_id != '0' && user_id != MODx.user.id){
                            value = value + ' <a href="'+ resource_url +'?switch_user='+ user_id +'" target="_blank" title="Авторизоваться от имени '+ record.get('username') +'"><i class="icon icon-user"></i></a>';
                        }
                        
                        return value;
                    }
                }
                ,{
                    header: 'Дата'
                    ,dataIndex: 'date'
                }
                ,{
                    header: 'ID документа'
                    ,dataIndex: 'resource_id'
                }
                ,{
                    header: 'IP'
                    ,dataIndex: 'ip'
                }
                ,{
                    header: 'Пользователь'
                    ,dataIndex: 'user_id'
                    ,renderer: function(value, cell, record){
                        var username = record.get('username');
                        
                        if(username !== '' && username !== null){
                            value = username + ' (' + value + ')';
                        }
                        
                        return value;
                    }
                }
                ,{
                    header: 'Статус запроса'
                    ,dataIndex: 'http_status'
                    ,renderer: function(value, cell, record){
                        
                        if(value == 200){
                            cell.style = cell.style + ";color:green;";
                        }
                        else{
                            cell.style = cell.style + ";color:red;";
                        }
                        
                        return value;
                    }
                }
                ,{
                    header: 'Время выполнения'
                    ,dataIndex: 'time'
                    ,renderer: function(value, cell, record){
                        
                        if(value > 0.5){
                            cell.style = cell.style + ";color:red;";
                        }
                        
                        return value;
                    }
                }
                ,{
                    header: 'Использовано памяти Мб'
                    ,dataIndex: 'php_memory'
                }
                ,{
                    header: 'Запросов к БД'
                    ,dataIndex: 'db_queries'
                }
                ,{
                    header: 'Время запросов к БД'
                    ,dataIndex: 'db_queries_time'
                }
                ,{
                    header: 'Из кеша'
                    ,dataIndex: 'from_cache'
                    ,renderer: function(value, cell, record){
                        
                        if(value == '1' || value == 'true'){
                            cell.style = 'color:green;';
                            // value = 'Да';
                            value = '<i class="icon icon-check"></i>';
                        }
                        else if(value == '' || value == '0' || value == 'false'){
                            cell.style = 'color:red;';
                            value = '<i class="icon icon-close"></i>';
                        }
                        
                        return value;
                    }
                }
            ]
            ,getCellEditor: this.getCellEditor
        });
        
        return;
    }
    
    
    ,getCellEditor: function(colIndex, rowIndex) {
        // return;
        
        // console.log(this);
        
        var xtype = 'textfield';
        var record = this.grid.store.getAt(rowIndex);
        var column = this.getColumnAt(colIndex);
        var o;
        
        if(this.grid.mainGrid){
            this.grid.mainGrid.__stopEditing = true;
        }
        
        // console.log(this);
        // return;
        
        var fieldName = this.getDataIndex(colIndex);
        
        // console.log(fieldName);
        
        // switch(fieldName){
        //     case 'date':
        //     case 'date_till':
        //         // return new Ext.form.DateField({
        //         //     // format: 'Y-m-d'
        //         //     // ,value: '2016-05-06'
        //         //     // value: '01/01/01'
        //         //     // value: new Date()
        //         // });
        //         
        //         return new Ext.grid.GridEditor(
        //             new Ext.form.DateField({
        //                 format: 'Y-m-d'
        //                 // value: '2016-05-06'
        //             })
        //         );
        //         
        //         // o = 'date';
        //         break;
        // }
        
        if(!o){
            o = MODx.load({
                xtype: xtype
            });
        } 
        
        return new Ext.grid.GridEditor(o);
    }
    

    
    ,onUpdateSuccess: function(response){
        if(!response.success){
            MODx.msg.alert(response.message || 'Ошибка выполнения запроса');
            return false;
        }
        
        this.refresh();
        return;
    }

});

Ext.reg('modmonitor-grid-requests',modMonitor.grid.Requests);


