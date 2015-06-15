var map=new Array(12);
var prevd=null
module.exports=function(fn)
{
	return function(n,d){
		if(d!=prevd)
		{
			for(var i=0;i<=10;i++)
			{
				map[i]=-1;
			}
			prevd=d;
		}
		if(map[n]>=0)return map[n];
		map[n]=fn(n);
		return map[n];
	}
}