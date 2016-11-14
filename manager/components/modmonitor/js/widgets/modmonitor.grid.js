
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
                    header: _("modmonitor.parent")
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
                    header: _("modmonitor.request_id")
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
                    header: _("modmonitor.element")
                    ,dataIndex: 'type'
                    // ,hidden: true
                    // ,editor: 'date'
                }
                ,{
                    header: _("modmonitor.name")
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
                    header: _("modmonitor.properties")
                    ,dataIndex: 'properties'
                }
                ,{
                    header: _("modmonitor.time")
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
                    header: _("modmonitor.db_queries")
                    ,dataIndex: 'db_queries'
                    // ,hidden: true
                    // ,editor: 'date'
                }
                ,{
                    header: _("modmonitor.db_queries_time")
                    ,dataIndex: 'db_queries_time'
                    // ,hidden: true
                    // ,editor: 'date'
                }
                ,{
                    header: _("modmonitor.php_memory")
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
                    ,text: _("modmonitor.group_elements")
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
            MODx.msg.alert(response.message || _("modmonitor.err_request"));
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
            ,'php_error'
            ,'php_error_info'
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
            ,emptyText: _("modmonitor.query")
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

        this.statusSearchField = new Ext.form.TextField({
            width: 120
            ,enableKeyEvents: true
            ,name: 'status'
            ,emptyText: _("modmonitor.status")
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
            ,emptyText: _("modmonitor.time")
            ,width: 110
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
            ,emptyText: _("modmonitor.from_cache")
            ,width: 100
            ,store: new Ext.data.SimpleStore({
                fields: ['d','v']
                ,data: [[_("modmonitor.from_cache_all"), ''],[_("modmonitor.from_cache_1"),'1'],[_("modmonitor.from_cache_2"),'2']]
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
            ,emptyText: _("modmonitor.context")
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
        
        
        this.phpErrorSearchField = new Ext.form.TextField({
            width: 100
            ,enableKeyEvents: true
            ,name: 'php_error'
            ,emptyText: _("modmonitor.php_error")
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

        this.SearchButton = new Ext.Button({
            text: _("modmonitor.search")
            ,scope: this
            ,handler: this.search
        });

        this.ClearButton = new Ext.Button({
            text: _("modmonitor.clear")
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
                ,this.statusSearchField
                ,this.phpErrorSearchField
                ,this.SearchButton
                ,this.ClearButton
                ,'->'
                ,{
                    text: _("modmonitor.truncate_stat")
                    ,cls: 'x-btn tree-trash'
                    ,handler: this.truncateStatistique
                    ,scope: this
                }
            ]
        });
    }
    
    
    ,clear: function(){
        
        var fields = [
            this.searchField,
            this.timeSearchField,
            this.cacheSearchField,
            this.contextSearchField,
            this.statusSearchField,
            this.phpErrorSearchField,
        ];
        
        for(var i in fields){
            
            var field = fields[i];
            
            if(typeof field != 'object'){
                continue;
            }
            
            field.setValue('');
            field.originalValue = field.getValue('');
            
            this.getStore().setBaseParam(field.name, field.getValue(''));
        }
        
        // this.getStore().setBaseParam( this.searchField.name, '' );
        // this.getStore().setBaseParam( this.timeSearchField.name, '' );
        // this.getStore().setBaseParam( this.cacheSearchField.name, '' );
        // this.getStore().setBaseParam( this.contextSearchField.name, '' );
        // this.getStore().setBaseParam( this.statusSearchField.name, '' );
        // this.getStore().setBaseParam( this.phpErrorSearchField.name, '' );
        
        // this.searchField.fireEvent('change', this.searchField);
        this.search();
    }
    
    ,search: function(){
        this.getBottomToolbar().changePage(0);
    }
    
    ,truncateStatistique: function(){
        
        MODx.msg.confirm({
          text: _("modmonitor.truncate_confirm")
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
                    header: _("modmonitor.parent")
                    ,dataIndex: 'parent'
                    // ,hidden: true
                }
                ,{
                    header: _("modmonitor.context_key")
                    ,dataIndex: 'context_key'
                }
                ,{
                    header: _("modmonitor.url")
                    ,dataIndex: 'url'
                    ,width: 300
                    ,renderer: function(value, cell, record){
                        
                        // value = value.replace(/^\/+/, "");
                        
                        var http_status = record.get("http_status");
                        var user_id = record.get('user_id');
                        var link = record.get("site_url");
                        
                        var full_link;
                        
                        // if(http_status == '200'){
                            link += value.replace(/^\/+/, "");
                        // }
                        // else{
                        //     link += value;
                        // }
                        
                        full_link = '<a href="'+ link +'" target="_blank" style="display:inline-block;padding-right: 10px;">'+ value +'</a>';
                        
                        if(user_id !== '' && user_id !== null && user_id != '0' && user_id != MODx.user.id){
                            var auth_link = link + (/\?/.test(link) ? "&" : "?") + 'switch_user='+ user_id;
                            
                            full_link += ' <a href="'+ auth_link +'" target="_blank" title="'+ _("modmonitor.auth_from_name") + record.get('username') +'"><i class="icon icon-user"></i></a>';
                        }
                        
                        
                        // var resource_url = record.get('resource_url');
                        // var user_id = record.get('user_id');
                        // 
                        // if(resource_url !== '' && resource_url !== null){
                            // full_link = '<a href="'+ link +'" target="_blank" style="display:inline-block;padding-right: 10px;">'+ value +'</a>';
                        // }
                        
                        // if(user_id !== '' && user_id !== null && user_id != '0' && user_id != MODx.user.id){
                            // full_link = value + ' <a href="'+ resource_url +'?switch_user='+ user_id +'" target="_blank" title="Авторизоваться от имени '+ record.get('username') +'"><i class="icon icon-user"></i></a>';
                        // }
                        
                        return full_link;
                    }
                }
                ,{
                    header: _("modmonitor.date")
                    ,dataIndex: 'date'
                }
                ,{
                    header: _("modmonitor.resource_id")
                    ,dataIndex: 'resource_id'
                }
                ,{
                    header: 'IP'
                    ,dataIndex: 'ip'
                }
                ,{
                    header: _("modmonitor.user_id")
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
                    header: _("modmonitor.http_status")
                    ,dataIndex: 'http_status'
                    ,renderer: function(value, cell, record){
                        
                        switch(value){
                            
                            case '200':
                                cell.style = cell.style + ";color:green;";
                                break;
                            
                            case '300':
                                value = value + ' Multiple Choices';
                                cell.style = cell.style + ";color:#FF7F50;";
                                break;
                                
                            case '301':
                                value = value + ' Moved Permanently';
                                cell.style = cell.style + ";color:#FF7F50;";
                                break;
                                
                            case '302':
                                value = value + ' Moved Temporarily/Found';
                                cell.style = cell.style + ";color:#FF7F50;";
                                break;
                                
                            
                            case '401':
                                value = value + ' Not Authorized';
                                cell.style = cell.style + ";color:red;";
                                break;
                            
                            case '402':
                                value = value + ' Payment Required';
                                cell.style = cell.style + ";color:red;";
                                break;
                            
                            case '403':
                                value = value + ' Forbidden';
                                cell.style = cell.style + ";color:red;";
                                break;
                            
                            case '404':
                                value = value + ' Not Found';
                                cell.style = cell.style + ";color:red;";
                                break;
                            
                            case '405':
                                value = value + ' Method Not Allowed';
                                cell.style = cell.style + ";color:red;";
                                break;
                                
                            default:
                                cell.style = cell.style + ";color:red;";
                                
                        }
                        
                        return value;
                    }
                }
                ,{
                    header: _("modmonitor.php_error")
                    ,dataIndex: 'php_error'
                    ,editable: true
                    ,renderer: function(value, cell, record){
                        
                        if(value != '0'){
                            
                            switch(value){
                                
                                case '1':
                                    value += " E_ERROR";
                                    cell.style = cell.style + ";color:red;";
                                    break;
                                
                                case '2':
                                    value += " E_WARNING";
                                    cell.style = cell.style + ";color:red;";
                                    break;
                                
                                case '4':
                                    value += " E_PARSE";
                                    cell.style = cell.style + ";color:red;";
                                    break;
                                
                                case '8':
                                    value += " E_NOTICE";
                                    cell.style = cell.style + ";color:red;";
                                    break;
                                
                                case '16':
                                    value += " E_CORE_ERROR";
                                    cell.style = cell.style + ";color:red;";
                                    break;
                                
                                case '32':
                                    value += " E_CORE_WARNING ";
                                    cell.style = cell.style + ";color:red;";
                                    break;
                                
                                case '64':
                                    value += " E_COMPILE_ERROR ";
                                    cell.style = cell.style + ";color:red;";
                                    break;
                                    
                                default:
                                    cell.style = cell.style + ";color:red;";
                            }
                        }
                        else{
                            value = '';
                        }
                        
                        return value;
                    }
                }
                ,{
                    header: _("modmonitor.time")
                    ,dataIndex: 'time'
                    ,renderer: function(value, cell, record){
                        
                        if(value > 0.5){
                            cell.style = cell.style + ";color:red;";
                        }
                        
                        return value;
                    }
                }
                ,{
                    header: _("modmonitor.php_memory")
                    ,dataIndex: 'php_memory'
                }
                ,{
                    header: _("modmonitor.db_queries")
                    ,dataIndex: 'db_queries'
                }
                ,{
                    header: _("modmonitor.db_queries_time")
                    ,dataIndex: 'db_queries_time'
                }
                ,{
                    header: _("modmonitor.from_cache_1")
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
        
        // console.log();
        // return;
        
        var fieldName = this.getDataIndex(colIndex);
        
        // console.log(fieldName);
        
        switch(fieldName){
            
            case "php_error":
                
                if(record.get(fieldName) != '0'){
                    
                    try{
                        var info = JSON.parse(record.get("php_error_info"));
                    }
                    catch(e){
                        MODx.msg.alert(_("MODx.lang.error"), _("modmonitor.unable_parse_data"));
                        return;
                    }
                    
                    
                    new MODx.Window({
                        title: _("modmonitor.err_descr")
                        ,width: 540
                        ,mode: 'local'
                        ,html: '\
                        <p><b>'+ _("modmonitor.err_descr_msg") +': </b>'+ info.message +'</p>\
                        <p><b>'+ _("modmonitor.err_descr_file") +': </b>'+ info.file +'</p>\
                        <p><b>'+ _("modmonitor.err_descr_line") +': </b>'+ info.line +'</p>\
                        '
                    })
                        .show();
                }
                
                
                return;
                break;
            
            // case 'date':
            // case 'date_till':
            //     // return new Ext.form.DateField({
            //     //     // format: 'Y-m-d'
            //     //     // ,value: '2016-05-06'
            //     //     // value: '01/01/01'
            //     //     // value: new Date()
            //     // });
            //     
            //     return new Ext.grid.GridEditor(
            //         new Ext.form.DateField({
            //             format: 'Y-m-d'
            //             // value: '2016-05-06'
            //         })
            //     );
            //     
            //     // o = 'date';
            //     break;
        }
        
        if(!o){
            o = MODx.load({
                xtype: xtype
            });
        } 
        
        return new Ext.grid.GridEditor(o);
    }
    

    
    ,onUpdateSuccess: function(response){
        if(!response.success){
            MODx.msg.alert(response.message || _("modmonitor.err_request"));
            return false;
        }
        
        this.refresh();
        return;
    }

});

Ext.reg('modmonitor-grid-requests',modMonitor.grid.Requests);


