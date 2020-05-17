
<template>
<div class="q-pa-md">
    <q-table
      dense       
      :title="title"
      :pagination.sync="pagination"
      :columns="columns"
      :data="data"
     
    >
      <template v-slot:header="props">
        <q-tr :props="props">
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
          <q-td v-bind:style="{'padding-left':'45px'}" key="name" :props="props">
            {{ props.row.name }} 
          </q-td>
          <q-td key="calories" :props="props">
           
              {{ props.row.calories }}
           
          </q-td>
          <q-td key="fat" :props="props">
         
              {{ props.row.fat }}
        
          </q-td>
          <q-td key="carbs" :props="props">
           
              {{ props.row.carbs }}
          
          </q-td>
          <q-td key="protein" :props="props">
           
              {{ props.row.protein }}
         
          </q-td>
          <q-td key="sodium" :props="props">
          
              {{ props.row.sodium }}
          
          </q-td>
          <q-td key="calcium" :props="props">
          
              {{ props.row.calcium }}
           
          </q-td>
          <q-td key="iron" :props="props">
            
              {{ props.row.iron }}
           
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
    grouped:{
      type:Boolean,
      default:false
    },
    data:Array,
    columns:Array
  },
   methods:{ 
    expand(name){
      // console.log(name)
     this.data.forEach(item=>{
        if(!item.isGroupHeader&&item.name==name) item.visible=!item.visible
        if(item.isGroupHeader&&item.groupByValue==name){
          if(item.icon==='add') 
            item.icon='remove'
          else 
            item.icon='add'
        }
      })
     }
  },
mounted(){
console.log('Mounted',this.grouped);

},
created(){
console.log('QGroupedTable Created',this.data);
},
  data () {
    return {
      pagination: {

                page: 1,
                rowsPerPage: 10
                // rowsNumber: xx if getting data from a server
             },
      columns1: [
        {
          name: 'name',
          required: true,
          label: 'Dessert (100g serving)',
          align: 'left',
          field: 'name',
        },
        { name: 'calories', align: 'center', label: 'Calories', field: 'calories' },
        { name: 'fat', label: 'Fat (g)', field: 'fat' },
        { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
        { name: 'protein', label: 'Protein (g)', field: 'protein' },
        { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
        { name: 'calcium', label: 'Calcium (%)', field: 'calcium' },
        { name: 'iron', label: 'Iron (%)', field: 'iron' }
      ],

      data1: [
        {label:'Frozen Yogurt Group',
        isGroupHeader:true,
        groupByValue:'Frozen Yogurt',
        icon:'add'},
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
          iron: '1%',
          isGroupHeader:false,
          visible:false
        },
        {
          name: 'Frozen Yogurt',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: '8%',
          iron: '1%',
          isGroupHeader:false,
           visible:false
        },
       {label:'Eclair Group',
        isGroupHeader:true,
       groupByValue:'Eclair',
       icon:'add'},
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: '6%',
          iron: '7%',
          isGroupHeader:false,
           visible:false
        },
        {
          name: 'Eclair',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: '3%',
          iron: '8%',
          isGroupHeader:false,
           visible:false
        },
        {label:'Gingerbread Group',
        isGroupHeader:true,
       groupByValue:'Gingerbread',
        icon:'add'},
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: '7%',
          iron: '16%',
          isGroupHeader:false,
           visible:false
        }
      ]
    }
}
}
</script>