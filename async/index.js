/*
Thanks to Shreyas Basarge for his help in solving this challenge
*/
module.exports={
	sequence:function(list){
		var len=list.length
		var a=null
		var data=null;
		function handler(index)
		{
			var fn_to_execute=list[index];
			if(index==len)
			{
				a(null,data);
			}
			fn_to_execute(function(err,new_data){
				data=new_data;
				handler(index+1);
			},data);

		}
		return function(f1){
			a=f1;
			handler(0);
		}
	},
	parallel:function(list){
		var co=0;
		var a=null;
		var li=new Array(list.length);
		function handler()
		{
			for(var i=0;i<list.length;i++)
			{
				function f1(index){
					var fn_to_execute=list[i];
					fn_to_execute(function(err,data){
						li[index]=data;
						co=co+1;
						if(co==list.length)
						{
							a(null,li);
						}
					});
				};
				f1(i);
			}
		}
		return function(f1){
			a=f1;
			handler();
		}
	},
	race:function(list){
		var a=null;
		var li=null;
		var co=0;
		function handler2()
		{
			for(var i=0;i<list.length;i++)
			{
				var fn_to_execute=list[i];
				fn_to_execute(function(err,data){
					console.log(data);
					li=data;
					co=co+1;
					if(co==1)
					{
						a(null,li);
					}
				});
			}
		}
		return function(f1){
			a=f1;
			handler2();
		}
	}
}