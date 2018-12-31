
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
        
        this.cm = new Ext.grid.ColumnModel({
            grid: this
            ,
            defaults: {
                width: 120
                ,sortable: true
                ,editable: false
            },
            columns: this.config.columns || [
                {
                    header: 'ID'
                    ,dataIndex: 'id'
                    ,editable: false
                }
                ,{
                    header: _("modmonitor.parent")
                    ,dataIndex: 'parent'
                }
                ,{
                    header: _("modmonitor.request_id")
                    ,dataIndex: 'request_id'
                    ,editable: false
                }
                ,{
                    header: _("modmonitor.element")
                    ,dataIndex: 'type'
                }
                ,{
                    header: _("modmonitor.name")
                    ,dataIndex: 'name'
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
                }
                ,{
                    header: _("modmonitor.db_queries_time")
                    ,dataIndex: 'db_queries_time'
                }
                ,{
                    header: _("modmonitor.php_memory")
                    ,dataIndex: 'php_memory'
                }
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
    Модели колонок
*/



modMonitor.grid.UrlColumn = function(config){

    Ext.applyIf(config, {
        header: _("modmonitor.url")
        ,dataIndex: 'url'
        ,width: 300
        ,renderer: function(value, cell, record){
            
            // value = value.replace(/^\/+/, "");
            
            var http_status = record.get("http_status");
            var user_id = record.get('user_id');
            var link = record.get("site_url");
            
            var full_link;
            
            link += value.replace(/^\/+/, "");
            
            full_link = '<a href="'+ link +'" target="_blank" style="display:inline-block;padding-right: 10px;">'+ value +'</a>';
            
            if(user_id !== '' && user_id !== null && user_id != '0'){
                var auth_link = link + (/\?/.test(link) ? "&" : "?") + 'switch_user='+ user_id;
                
                var user_icon_style="";
                
                if(user_id == MODx.user.id){
                    user_icon_style=';color:green;';
                }
                
                full_link = '<a href="'+ auth_link +'" target="_blank" title="'+ _("modmonitor.auth_from_name") + record.get('username') +'"><i class="icon icon-user" style="'+ user_icon_style +'"></i></a> ' + full_link;
                
            }
            
            
            
            full_link = '<div style="text-overflow:clip;">'+ full_link +'</div>';
            
            return full_link;
        }
    });

    modMonitor.grid.UrlColumn.superclass.constructor.call(this,config);
};

Ext.extend(modMonitor.grid.UrlColumn, Ext.grid.Column,{});


Ext.grid.Column.types['modmonitor-grid-urlcolumn'] = modMonitor.grid.UrlColumn;




modMonitor.grid.UserIdColumn = function(config){

    Ext.applyIf(config, {
        header: _("modmonitor.user_id")
        ,dataIndex: 'user_id'
        ,renderer: function(value, cell, record){
            var username = record.get('username');
            
            if(username !== '' && username !== null){
                value = username + ' (' + value + ')';
            }
            
            return value;
        }
        ,hidden: true
    });

    modMonitor.grid.UserIdColumn.superclass.constructor.call(this,config);
};

Ext.extend(modMonitor.grid.UserIdColumn, Ext.grid.Column,{});


Ext.grid.Column.types['modmonitor-grid-useridcolumn'] = modMonitor.grid.UserIdColumn;




modMonitor.grid.HttpStatusColumn = function(config){

    Ext.applyIf(config, {
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
    });

    modMonitor.grid.HttpStatusColumn.superclass.constructor.call(this,config);
};

Ext.extend(modMonitor.grid.HttpStatusColumn, Ext.grid.Column,{});


Ext.grid.Column.types['modmonitor-grid-httpstatuscolumn'] = modMonitor.grid.HttpStatusColumn;



modMonitor.grid.PhpErrorColumn = function(config){
    
    Ext.applyIf(config, {
        header: _("modmonitor.php_error")
        ,dataIndex: 'php_error'
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
    });
    
    // console.log(config);
    
    modMonitor.grid.PhpErrorColumn.superclass.constructor.call(this,config);
};

Ext.extend(modMonitor.grid.PhpErrorColumn, Ext.grid.Column,{});

Ext.grid.Column.types['modmonitor-grid-phperrorcolumn'] = modMonitor.grid.PhpErrorColumn;



modMonitor.grid.TimeColumn = function(config){

    Ext.applyIf(config, {
        header: _("modmonitor.time")
        ,dataIndex: 'time'
        ,renderer: function(value, cell, record){
            
            if(value > 0.5){
                cell.style = cell.style + ";color:red;";
            }
            
            return value;
        }
    });

    modMonitor.grid.TimeColumn.superclass.constructor.call(this,config);
};

Ext.extend(modMonitor.grid.TimeColumn, Ext.grid.Column,{});

Ext.grid.Column.types['modmonitor-grid-timecolumn'] = modMonitor.grid.TimeColumn;



modMonitor.grid.FromCacheColumn = function(config){

    Ext.applyIf(config, {
        header: _("modmonitor.from_cache_1")
        ,dataIndex: 'from_cache'
        ,renderer: function(value, cell, record){
            
            if(value == '1' || value == 'true'){
                cell.style += ';color:green;';
                // value = 'Да';
                value = '<i class="icon icon-check"></i>';
            }
            else if(value == '' || value == '0' || value == 'false'){
                cell.style += ';color:red;';
                value = '<i class="icon icon-close"></i>';
            }
            
            return value;
        }
    });

    modMonitor.grid.FromCacheColumn.superclass.constructor.call(this,config);
};

Ext.extend(modMonitor.grid.FromCacheColumn, Ext.grid.Column,{});

Ext.grid.Column.types['modmonitor-grid-fromcachecolumn'] = modMonitor.grid.FromCacheColumn;


modMonitor.grid.RefererColumn = function(config){

    Ext.applyIf(config, {
        header: _("modmonitor.referer")
        ,dataIndex: 'referer'
        ,renderer: function(value, cell, record){
            
            if(value !== ''){
                
                value = '<a href="'+ value +'" target="_blank">'+value+'</a>';
            }
            
            return value;
        }
    });

    modMonitor.grid.RefererColumn.superclass.constructor.call(this,config);
};

Ext.extend(modMonitor.grid.RefererColumn, Ext.grid.Column,{});

Ext.grid.Column.types['modmonitor-grid-referercolumn'] = modMonitor.grid.RefererColumn;


modMonitor.grid.UserAgentColumn = function(config){

    Ext.applyIf(config, {
        header: _("modmonitor.user_agent")
        ,dataIndex: 'user_agent'
    });

    modMonitor.grid.UserAgentColumn.superclass.constructor.call(this,config);
};

Ext.extend(modMonitor.grid.UserAgentColumn, Ext.grid.Column,{});

Ext.grid.Column.types['modmonitor-grid-useragentcolumn'] = modMonitor.grid.UserAgentColumn;





/*
    Грид запросов с деталями по запросам
*/




modMonitor.grid.QuerySearchField = function(config){

    Ext.applyIf(config, {
        width: 206
        ,enableKeyEvents: true
        ,name: 'query'
        ,emptyText: _("modmonitor.query")
    });

    modMonitor.grid.QuerySearchField.superclass.constructor.call(this,config);
};

Ext.extend(modMonitor.grid.QuerySearchField, Ext.form.TextField,{});

Ext.reg('modmonitor-grid-querysearchfield', modMonitor.grid.QuerySearchField);



modMonitor.grid.RuntimeSearchField = function(config){

    Ext.applyIf(config, {
        enableKeyEvents: true
        ,name: 'time'
        ,emptyText: _("modmonitor.runtime")
        ,width: 100
    });

    modMonitor.grid.RuntimeSearchField.superclass.constructor.call(this,config);
};

Ext.extend(modMonitor.grid.RuntimeSearchField, Ext.form.NumberField,{});

Ext.reg('modmonitor-grid-runtimesearchfield', modMonitor.grid.RuntimeSearchField);



modMonitor.grid.CacheSearchField = function(config){

    Ext.applyIf(config, {
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
    });

    modMonitor.grid.CacheSearchField.superclass.constructor.call(this,config);
};

Ext.extend(modMonitor.grid.CacheSearchField, MODx.combo.ComboBox,{});

Ext.reg('modmonitor-grid-cachesearchfield', modMonitor.grid.CacheSearchField);



modMonitor.grid.ContextSearchField = function(config){

    Ext.applyIf(config, {
        name: 'context'
        ,emptyText: _("modmonitor.context")
        ,width: 110
        ,baseParams: {
            action: 'context/getlist'
            ,sort: 'key'
            ,dir: 'desc'
        }
    });

    modMonitor.grid.ContextSearchField.superclass.constructor.call(this,config);
};

Ext.extend(modMonitor.grid.ContextSearchField, MODx.combo.Context,{});

Ext.reg('modmonitor-grid-contextsearchfield', modMonitor.grid.ContextSearchField);



modMonitor.grid.PhpErrorSearchField = function(config){

    Ext.applyIf(config, {
        width: 100
        ,enableKeyEvents: true
        ,name: 'php_error'
        ,emptyText: _("modmonitor.php_error")
    });

    modMonitor.grid.PhpErrorSearchField.superclass.constructor.call(this,config);
};

Ext.extend(modMonitor.grid.PhpErrorSearchField, Ext.form.TextField,{});

Ext.reg('modmonitor-grid-phperrorsearchfield', modMonitor.grid.PhpErrorSearchField);



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
        ,fields: config.fields
        ,paging: true
        ,pageSize: 10
        ,plugins: this.expander
    });

    this.config = config;

    config.tbar = this.getToolbar();
    
    modMonitor.grid.Requests.superclass.constructor.call(this,config);
    
    this.on("celldblclick", this.OnCelldDlClick, this);
    
    // var toolbar = this.getToolbar();
    
    // for(var i in toolbar.items.items){
    //     var item = toolbar.items.items[i];
    //     
    //     if(typeof item != 'object'){
    //         continue;
    //     }
    //     
    //     
    //     if(typeof item.getValue != 'function'){
    //         continue;
    //     }
    //     
    //     console.log(typeof item.getValue);
    //     
    //     console.log(item);
    //     
    //     item.on("change", function(field, e){
    //         
    //         console.log(field);
    //         
    //         
    //         if(field.isDirty()){
    //             field.originalValue = field.getValue();
    //             this.getStore().setBaseParam( field.name, field.getValue() );
    //             this.search();
    //         }
    //     
    //     }, this);
    //     
    // }
    
    window.grid = this;
    
    // for(var i in this.filters){
    //     var field = this.filters[i];
    //     
    //     if(typeof field != 'object'){
    //         continue;
    //     }
    //     
    //     console.log(field);
    // }
    
};

Ext.extend(modMonitor.grid.Requests, MODx.grid.Grid,{

    getToolbar: function(){
        
        this.filterFields = [];
        
        var filters = this.config.filters || [
            
            // {
            //     xtype: "modmonitor-grid-querysearchfield"
            // }
            // 
            // ,{
            //     xtype: "modmonitor-grid-runtimesearchfield"
            // }
            // 
            // ,{
            //     xtype: "modmonitor-grid-cachesearchfield"
            // }
            // 
            // ,{
            //     xtype: "modmonitor-grid-contextsearchfield"
            // }
            // 
            // ,{
            //     xtype: "modmonitor-grid-phperrorsearchfield"
            // }
            
        ];
        
        // console.log(filters);
        // console.log(this.filters);
        
        for(var i in filters){
            var filter = filters[i];
            
            if(typeof filter == 'function'){
                continue;
            }
            
            try{
                if(filter = Ext.ComponentMgr.create(filter)){
                    
                    filter.enableKeyEvents = true;
                    
                    filter.on("change", function(field, e){
                        
                        // console.log(field);
                        
                        
                        if(field.isDirty()){
                            field.originalValue = field.getValue();
                            this.getStore().setBaseParam( field.name, field.getValue() );
                            this.search();
                        }
                    
                    }, this);
                    
                    
                    filter.on("keyup", function(field, e){
                        
                        // console.log(field);
                        
                        // Если нажали ENTERsearchField
                        if(e.getKey() == e.ENTER){
                            field.fireEvent('change', field, e);
                        }
                    
                    }, this);
                    
                    
                    filter.on("select", function(field, e){
                        
                        // console.log(field);
                        
                        // Если нажали ENTERsearchField
                        field.fireEvent('change', field, e);
                    
                    }, this);
                    
                    
    //                 ,keyup: {
    //                     fn: function(field, e){
    //                         // Если нажали ENTERsearchField
    //                         if(e.getKey() == e.ENTER){
    //                             field.fireEvent('change', field, e);
    //                         }
    //                     }
    //                     ,scope: this
    //                 }
                //     select: {
                //         fn: function(field, value){
                //             this.getStore().setBaseParam( field.name, field.getValue() );
                //             this.search();
                //         }
                //         ,scope: this
                //     }
                    
                    this.filterFields.push(filter);
                }
            }
            catch(e){
                console.log(e);
            }
            
            
            
            // console.log(filter);
        }
        
        // for(var i in toolbar.items.items){
        //     var item = toolbar.items.items[i];
        //     
        //     if(typeof item != 'object'){
        //         continue;
        //     }
        //     
        //     
        //     if(typeof item.getValue != 'function'){
        //         continue;
        //     }
        //     
        //     console.log(typeof item.getValue);
        //     
        //     console.log(item);
        //     
        //     item.on("change", function(field, e){
        //         
        //         console.log(field);
        //         
        //         
        //         if(field.isDirty()){
        //             field.originalValue = field.getValue();
        //             this.getStore().setBaseParam( field.name, field.getValue() );
        //             this.search();
        //         }
        //     
        //     }, this);
        //     
        // }

        var items = this.filterFields;
        // var items = [];
        

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
        
        
        items.push(this.SearchButton);
        items.push(this.ClearButton);
        items.push('->');
        items.push({
            text: _("modmonitor.truncate_stat")
            ,cls: 'x-btn tree-trash'
            ,handler: this.truncateStatistique
            ,scope: this
        });
        
        // console.log(items);



        return new Ext.Toolbar({
            defaults:{
                style: "margin: 0 3px;"
            }
            ,items: items
            
            // ,items: [
            //     this.filters.searchField
            //     ,this.filters.timeSearchField
            //     
            //     ,this.filters.cacheSearchField
            //     ,this.filters.contextSearchField
            //     ,this.filters.statusSearchField
            //     ,this.filters.phpErrorSearchField
            //     
            //     ,this.SearchButton
            //     ,this.ClearButton
            //     ,'->'
            //     ,{
            //         text: _("modmonitor.truncate_stat")
            //         ,cls: 'x-btn tree-trash'
            //         ,handler: this.truncateStatistique
            //         ,scope: this
            //     }
            // ]
        });
    }
    
    
    ,clear: function(){
        
        // var fields = [
        //     this.searchField,
        //     this.timeSearchField,
        //     this.cacheSearchField,
        //     this.contextSearchField,
        //     this.statusSearchField,
        //     this.phpErrorSearchField,
        // ];
        
        // console.log(this.filterFields);
        
        for(var i in this.filterFields){
            
            var field = this.filterFields[i];
            
            if(typeof field != 'object'){
                continue;
            }
            
            if(typeof field.setValue != 'function'){
                continue;
            }
            
            // console.log(field);
            
            field.setValue(field.initialConfig.value || '');
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
        
        // console.log(this);
        
        // var columns = [
        //     this.expander
        // ];
        // 
        
        this.config.columns = this.config.columns || [
            // {
            //     header: 'ID'
            //     ,dataIndex: 'id'
            //     ,editable: false
            //     // ,hidden: true
            // }
            // 
            // // 
            // ,{
            //     header: _("modmonitor.parent")
            //     ,dataIndex: 'parent'
            //     // ,hidden: true
            // }
            // 
            // //
            // ,{
            //     header: _("modmonitor.context_key")
            //     ,dataIndex: 'context_key'
            // }
            // // , new Ext.grid.Column({
            // //     header: "sdfs"
            // // })
            // 
            // // 
            // ,{
            //     xtype: "modmonitor-grid-urlcolumn"
            // }
            // // ,{
            //     // xtype: 'modmonitor-grid-urlcolumn'
            //     // header: _("modmonitor.url")
            //     // ,dataIndex: 'url'
            //     // ,width: 300
            //     // ,renderer: function(value, cell, record){
            //     //     
            //     //     // value = value.replace(/^\/+/, "");
            //     //     
            //     //     var http_status = record.get("http_status");
            //     //     var user_id = record.get('user_id');
            //     //     var link = record.get("site_url");
            //     //     
            //     //     var full_link;
            //     //     
            //     //     link += value.replace(/^\/+/, "");
            //     //     
            //     //     full_link = '<a href="'+ link +'" target="_blank" style="display:inline-block;padding-right: 10px;">'+ value +'</a>';
            //     //     
            //     //     if(user_id !== '' && user_id !== null && user_id != '0' && user_id != MODx.user.id){
            //     //         var auth_link = link + (/\?/.test(link) ? "&" : "?") + 'switch_user='+ user_id;
            //     //         
            //     //         full_link += ' <a href="'+ auth_link +'" target="_blank" title="'+ _("modmonitor.auth_from_name") + record.get('username') +'"><i class="icon icon-user"></i></a>';
            //     //     }
            //     //     
            //     //     
            //     //     return full_link;
            //     // }
            // // }
            // //
            // ,{
            //     header: _("modmonitor.date")
            //     ,dataIndex: 'date'
            // }
            // //
            // ,{
            //     header: _("modmonitor.resource_id")
            //     ,dataIndex: 'resource_id'
            // }
            // //
            // ,{
            //     header: 'IP'
            //     ,dataIndex: 'ip'
            // }
            // 
            // // 
            // ,{
            //     xtype: "modmonitor-grid-useridcolumn"
            // }
            // // ,{
            // //     header: _("modmonitor.user_id")
            // //     ,dataIndex: 'user_id'
            // //     ,renderer: function(value, cell, record){
            // //         var username = record.get('username');
            // //         
            // //         if(username !== '' && username !== null){
            // //             value = username + ' (' + value + ')';
            // //         }
            // //         
            // //         return value;
            // //     }
            // // }
            // //
            // ,{
            //     header: _("modmonitor.http_status")
            //     ,dataIndex: 'http_status'
            //     ,renderer: function(value, cell, record){
            //         
            //         switch(value){
            //             
            //             case '200':
            //                 cell.style = cell.style + ";color:green;";
            //                 break;
            //             
            //             case '300':
            //                 value = value + ' Multiple Choices';
            //                 cell.style = cell.style + ";color:#FF7F50;";
            //                 break;
            //                 
            //             case '301':
            //                 value = value + ' Moved Permanently';
            //                 cell.style = cell.style + ";color:#FF7F50;";
            //                 break;
            //                 
            //             case '302':
            //                 value = value + ' Moved Temporarily/Found';
            //                 cell.style = cell.style + ";color:#FF7F50;";
            //                 break;
            //                 
            //             
            //             case '401':
            //                 value = value + ' Not Authorized';
            //                 cell.style = cell.style + ";color:red;";
            //                 break;
            //             
            //             case '402':
            //                 value = value + ' Payment Required';
            //                 cell.style = cell.style + ";color:red;";
            //                 break;
            //             
            //             case '403':
            //                 value = value + ' Forbidden';
            //                 cell.style = cell.style + ";color:red;";
            //                 break;
            //             
            //             case '404':
            //                 value = value + ' Not Found';
            //                 cell.style = cell.style + ";color:red;";
            //                 break;
            //             
            //             case '405':
            //                 value = value + ' Method Not Allowed';
            //                 cell.style = cell.style + ";color:red;";
            //                 break;
            //                 
            //             default:
            //                 cell.style = cell.style + ";color:red;";
            //                 
            //         }
            //         
            //         return value;
            //     }
            // }
            // //
            // ,{
            //     header: _("modmonitor.php_error")
            //     ,dataIndex: 'php_error'
            //     ,editable: true
            //     ,renderer: function(value, cell, record){
            //         
            //         console.log(this);
            //         
            //         if(value != '0'){
            //             
            //             switch(value){
            //                 
            //                 case '1':
            //                     value += " E_ERROR";
            //                     cell.style = cell.style + ";color:red;";
            //                     break;
            //                 
            //                 case '2':
            //                     value += " E_WARNING";
            //                     cell.style = cell.style + ";color:red;";
            //                     break;
            //                 
            //                 case '4':
            //                     value += " E_PARSE";
            //                     cell.style = cell.style + ";color:red;";
            //                     break;
            //                 
            //                 case '8':
            //                     value += " E_NOTICE";
            //                     cell.style = cell.style + ";color:red;";
            //                     break;
            //                 
            //                 case '16':
            //                     value += " E_CORE_ERROR";
            //                     cell.style = cell.style + ";color:red;";
            //                     break;
            //                 
            //                 case '32':
            //                     value += " E_CORE_WARNING ";
            //                     cell.style = cell.style + ";color:red;";
            //                     break;
            //                 
            //                 case '64':
            //                     value += " E_COMPILE_ERROR ";
            //                     cell.style = cell.style + ";color:red;";
            //                     break;
            //                     
            //                 default:
            //                     cell.style = cell.style + ";color:red;";
            //             }
            //         }
            //         else{
            //             value = '';
            //         }
            //         
            //         return value;
            //     }
            // }
            // //
            // ,{
            //     header: _("modmonitor.time")
            //     ,dataIndex: 'time'
            //     ,renderer: function(value, cell, record){
            //         
            //         if(value > 0.5){
            //             cell.style = cell.style + ";color:red;";
            //         }
            //         
            //         return value;
            //     }
            // }
            // //
            // ,{
            //     header: _("modmonitor.php_memory")
            //     ,dataIndex: 'php_memory'
            // }
            // //
            // ,{
            //     header: _("modmonitor.db_queries")
            //     ,dataIndex: 'db_queries'
            // }
            // //
            // ,{
            //     header: _("modmonitor.db_queries_time")
            //     ,dataIndex: 'db_queries_time'
            // }
            // //
            // ,{
            //     header: _("modmonitor.from_cache_1")
            //     ,dataIndex: 'from_cache'
            //     ,renderer: function(value, cell, record){
            //         
            //         if(value == '1' || value == 'true'){
            //             cell.style = 'color:green;';
            //             // value = 'Да';
            //             value = '<i class="icon icon-check"></i>';
            //         }
            //         else if(value == '' || value == '0' || value == 'false'){
            //             cell.style = 'color:red;';
            //             value = '<i class="icon icon-close"></i>';
            //         }
            //         
            //         return value;
            //     }
            // }
        ];
        
        this.config.columns.unshift(this.expander);
        
        // columns.push(
        // );
        
        this.cm = new Ext.grid.ColumnModel({
            grid: this
            ,defaults: {
                width: 120
                ,sortable: true
                ,editable: false
            },
            columns: this.config.columns
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
        
        // switch(fieldName){
        //     
        //     
        //     // case 'date':
        //     // case 'date_till':
        //     //     // return new Ext.form.DateField({
        //     //     //     // format: 'Y-m-d'
        //     //     //     // ,value: '2016-05-06'
        //     //     //     // value: '01/01/01'
        //     //     //     // value: new Date()
        //     //     // });
        //     //     
        //     //     return new Ext.grid.GridEditor(
        //     //         new Ext.form.DateField({
        //     //             format: 'Y-m-d'
        //     //             // value: '2016-05-06'
        //     //         })
        //     //     );
        //     //     
        //     //     // o = 'date';
        //     //     break;
        // }
        
        if(!o){
            o = MODx.load({
                xtype: xtype
            });
        } 
        
        return new Ext.grid.GridEditor(o);
    }
    

    ,OnCelldDlClick: function(grid, rowIndex, columnIndex, e ){
        // console.log(this);
        // 
        // console.log(columnIndex);
        // console.log(this.getView().cm.columns[columnIndex].dataIndex);
        
        var record = this.store.getAt(rowIndex);
        
        // console.log(record);
        
        if(this.getView().cm.columns[columnIndex].dataIndex == 'php_error' && record.get('php_error') != '0'){
            
            try{
                var info = JSON.parse(record.get("php_error_info"));
            }
            catch(e){
                MODx.msg.alert(_("MODx.lang.error"), _("modmonitor.unable_parse_data"));
                return;
            }
            
            this.ErrWindow = new MODx.Window({
                title: _("modmonitor.err_descr")
                ,width: 540
                ,mode: 'local'
                ,html: '\
                <p><b>'+ _("modmonitor.err_descr_msg") +': </b>'+ info.message +'</p>\
                <p><b>'+ _("modmonitor.err_descr_file") +': </b>'+ info.file +'</p>\
                <p><b>'+ _("modmonitor.err_descr_line") +': </b>'+ info.line +'</p>\
                '
                ,buttons: [{
                    text: _('close')
                    ,scope: this
                    ,handler: function() { 
                        this.ErrWindow.close(); 
                    }
                }]
            });
            
            this.ErrWindow.show();
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

Ext.reg('modmonitor-grid-requests',modMonitor.grid.Requests);


