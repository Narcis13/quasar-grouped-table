
<template>
<div class="q-pa-md">
    <q-table
      :dense="dense"
      row-key="name"
      :dark="dark"       
      :title="title"
      :pagination.sync="pagination"
      :columns="columns"
      :data="data"
      :selection="selection_prop"
      :selected.sync="selected_prop"
     
    >
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
            
          <span><q-btn size="sm" color="primary" round dense  :icon="props.row.icon" @click="expand(props.row.groupByValue)"/></span>
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
        groupOn(newValue){
          this.group(newValue);
        },
        'selected_prop':function () {
            this.$emit('select',this.selected_prop)
          }
  },
   methods:{ 
    group(col){

          this.data.splice(0,Infinity,...this.ungroupedData);
          this.prepareData(this.data);      

         if(col!==":nothing"){

             this.sortBy(col);
             this.countUnique(col);
             this.groupBy(col);

          }

    },
    expand(name){
    //  console.log(name)
     this.data.forEach(item=>{
        if(!item.isGroupHeader&&item[this.groupOn]===name) item.visible=!item.visible
        if(item.isGroupHeader&&item.groupByValue==name){
          if(item.icon==='add') 
            item.icon='remove'
          else 
            item.icon='add'
        }
      })
     },
     prepareData(d){
        let idx=1;
        d.map(item=>{
          item._idx_=idx;
          item.visible=true;
          item.isGroupHeader=false;
          idx++;
        });
     },
     sortBy(col){
      
       this.data.sort(
         function(a, b) {          
            if (a[col] === b[col]) {
              
              return a._idx - b._idx_;
            }
            return a[col] > b[col] ? 1 : -1;
        });
     
     },
     countUnique(col){
        this.uniqueItems={}; 
        let count=0;
        let that=this;
        let currentGroup=this.data[0][col];
        this.data.forEach(function(item,index,array){
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
     },
     groupBy(col){

       let currGroup='';
       let that=this;
       let gColDef = this.columns.filter(obj=>{
         return obj.name===this.groupOn
       })
     
       this.data.forEach(function(item,index,array){
          if (item[col]!==currGroup){
            array.splice(index,0,{
              label:gColDef[0].formatGroupHeader?gColDef[0].formatGroupHeader(item[col],that.uniqueItems[item[col]]):item[col]+' Group',
              isGroupHeader:true,
              groupByValue:item[col],
              icon:'remove'
            })
           
            currGroup=item[col];
          }

       })
     }
  },
mounted(){
console.log('Mounted',this.groupOn);

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

this.originalData=[...this.data];

this.prepareData(this.data);

this.ungroupedData=[...this.data];

if(this.groupOn!==":nothing"){
  
  this.sortBy(this.groupOn);

  this.countUnique(this.groupOn);
  console.log(this.uniqueItems);
  
  this.groupBy(this.groupOn);
  };

},
  data () {
    return {
      selection_prop: '',
      selected_prop: [],
      originalData:[],
      ungroupedData:[],
      uniqueItems:{},
      pagination: {
                page: 1,
                rowsPerPage: 0           
             }
}
}
}
</script>