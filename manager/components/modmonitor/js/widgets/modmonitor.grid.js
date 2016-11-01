
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
            ,'type'
            ,'name'
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
            ,'url'
            ,'date'
            ,'context_key'
            ,'site_url'
            ,'resource_id'
            ,'http_status'
            ,'user_id'
            ,'ip'
            ,'time'
            ,'php_memory'
            ,'db_queries'
            ,'db_queries_time'
            ,'from_cache'
            ,'menu'
        ]
        ,paging: true
        ,pageSize: 10
        ,plugins: this.expander
    });

    this.config = config;

    modMonitor.grid.Requests.superclass.constructor.call(this,config);
};

Ext.extend(modMonitor.grid.Requests, MODx.grid.Grid,{

    _loadExpander: function(){
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
                    
                    this.expander.Grids[id] = new modMonitor.grid.RequestItems({
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
                    header: 'Контекст'
                    ,dataIndex: 'context_key'
                    ,hidden: true
                }
                ,{
                    header: 'Адрес'
                    ,dataIndex: 'url'
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
                    header: 'ID Пользователя'
                    ,dataIndex: 'user_id'
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


