
<template>
<div class="q-pa-md">
    <q-table
      :dense="dense"
      row-key="name"
      :dark="dark"       
      :title="title"
      :pagination.sync="pagination"
      :columns="columns"
      :data="table_data"
      :selection="selection_prop"
      :selected.sync="selected_prop"
      :loading="loading"
     
    >
      <template v-slot:loading>
            <q-inner-loading showing color="primary" />
      </template>
     
      <template v-slot:top>
          <slot name="top" v-if="hasDefaultSlot">
          </slot>
      </template>

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width v-if="selection_prop!='none'">
              <q-checkbox
                      v-if="props.multipleSelect"
                      v-model="props.selected"
                      indeterminate-value="some"
              />
          </q-th>
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            :class="'text-'+col.align"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr v-show="props.row.isGroupHeader" :props="props">
        <q-td key="name" :props="props" colSpan="100%" class="text-bold ">
            <!--  :icon="props.row.icon"  -->
          <span><q-btn size="sm" color="primary" round dense  :icon="props.row.icon" @click="expand(props.row.groupByValue,props.row)"/></span>
         {{ props.row.label }}
          </q-td>    

        </q-tr>
        <q-tr v-show="!props.row.isGroupHeader&&props.row.visible" :props="props" >
         
          <q-td auto-width v-if="selection_prop!='none'">
              <q-checkbox :dark="dark" :dense="dense" color="primary" v-model="props.selected"/>
          </q-td>

          <q-td v-for="col in props.cols" :key="col.name" :props="props" :class="'text-'+col.align">
            {{ props.row[col.field] }} 
          </q-td>

        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  name: 'QGroupedTable',
  props:{
    title:String,
    loading:Boolean,
    selection:String,
    grouped:{
      type:Boolean,
      default:false
    },
    dense:{
      type:Boolean,
      default:false
    },
    dark:{
      type:Boolean,
      default:false
    },
    'group-on':{
      type:String,
      default:':nothing'
    },
    data:Array,
    selected:Array,
    columns:Array
  },
  watch:{
        data(newData){
           // console.log('DATA CHANGED!')
            this.groupeData();
        },
        groupOn(newValue){
         // console.log('group watcher', newValue) 
          this.groupeData();
          this.toHide='__none__';
          this.gIcon='remove';
          this.gIconIndex=-1;
        },
        'selected_prop':function () {
            this.$emit('select',this.selected_prop)
          }
  },
  computed:{
      hasDefaultSlot() {
               return this.$scopedSlots.hasOwnProperty("top");
      },
       preparedData(){
         
              let idx=1;
              let table_data=[];
              let that=this;
               this.data.map(item=>{
                item._idx_=idx;

                  if(that.toHide) item.visible=true;
                  item.isGroupHeader=false;
                  idx++;
                  table_data.push(item);
              });
 
              return table_data;

       }
  },
   methods:{ 

    expand(name,row){
      //console.log(name,this.data)
      this.toHide=name;

        this.table_data.forEach(item=>{
              if(!item.isGroupHeader&&item[this.groupOn]===name) item.visible=!item.visible
              if(item.isGroupHeader&&item.groupByValue==name){
                if(item.icon==='add') 
                  item.icon='remove'
                else 
                  item.icon='add'
              }
            })
     },
     groupeData(){
        if(this.preparedData.length>0){ 
         this.table_data=[];
         let that=this;
         this.table_data=[...this.preparedData];
         if(this.groupOn!==":nothing"){
              let col=this.groupOn;    

              //sorting data
              this.table_data.sort(
                                function(a, b) {          
                                    if (a[col] === b[col]) {
                                      
                                      return a._idx - b._idx_;
                                    }
                                    return a[col] > b[col] ? 1 : -1;
                              });

              // counting .... 
              this.uniqueItems={}; 
              let count=0;
              let currentGroup=this.table_data[0][col];
              this.table_data.forEach(function(item,index,array){
                if(item[col]===currentGroup){
                  count++;
                }
                else {
                  that.uniqueItems[currentGroup]=count;
                  currentGroup=item[col];
                  count=1;
                }
              })
              that.uniqueItems[currentGroup]=count;

              // grouping...
              let currGroup='';
              let gColDef = this.columns.filter(obj=>{
                return obj.name===this.groupOn
              })
              let icon='remove';
              this.table_data.forEach(function(item,index,array){
                  if (item[col]!==currGroup){

                    array.splice(index,0,{
                      label:gColDef[0].formatGroupHeader?gColDef[0].formatGroupHeader(item[col],that.uniqueItems[item[col]]):item[col]+' Group',
                      isGroupHeader:true,
                      groupByValue:item[col],
                      _idx_:index,
                      icon
                    })
                  
                    currGroup=item[col];
                  }

              })

              }
        } 

       }
  },
mounted(){
console.log('Mounted',this);

},
created(){

            if (this.selection === undefined) {
                this.selection_prop = 'none';
            } else {
                this.selection_prop = this.selection;
            }

            if (this.selected === undefined) {
                this.selected_prop = [];
            } else {
                this.selected_prop = this.selected;
            }  

            this.groupeData();

},
  data () {
    return {
      toHide:'__none__',
      gIcon:'remove',
      selection_prop: '',
      gIconIndex:-1,
      selected_prop: [],
      originalData:[],
      table_data:[],
      uniqueItems:{},
      pagination: {
                page: 1,
                rowsPerPage: 0           
             }
}
}
}
</script>