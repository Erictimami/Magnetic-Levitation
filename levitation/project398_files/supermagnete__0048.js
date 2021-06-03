
function disqus_init(identifier,lang){if(/MSIE (\d+\.\d+);/.test(navigator.userAgent)&&document.documentMode<9){return;}
var api='/'+lang+'/ajax.php';var data={action:'disqus_comment_count',identifier:identifier};$.ajax({type:'GET',url:api,data:data,dataType:'json'}).done(function(data){var post_count=data.count;var text=data.link_text;$("#disqus_links").find(".disqus_toggle .text").html(text).show();$("#disqus_links").show();});$('.disqus_toggle').bind('click',function(){$('#disqus_thread').show();$('#disqus_links').hide();$.ajaxSetup({cache:true,contentType:'application/x-www-form-urlencoded; charset=utf-8'});$.getScript("http://"+disqus_shortname+".disqus.com/embed.js");$.ajaxSetup({cache:false});return false;});}
function toggleImageSize(id,width,height,large_width,large_height){var img=document.getElementById(id);var result=img.src.match(/(.*)(medium|large)(.*)/);var overlay_img=document.getElementById(id+"_overlay");if(overlay_img){var result_overlay=overlay_img.src.match(/(.*)(medium|large)(.*)/);}
var article_img=document.getElementById('article_main_image');if(result[2]=='medium'){img.src=result[1]+'large'+result[3];img.style.width=large_width+"px";img.style.height=large_height+"px";img.style.marginRight="0px";img.style.cursor="url('/pics/icons/zoom_minus.cur'), pointer";if(id=='img_main'&&article_img){article_img.style.clear='none';}
if(overlay_img){overlay_img.src=result_overlay[1]+'large'+result_overlay[3];overlay_img.style.width=(large_width/2.1)+"px";overlay_img.style.height=(large_width/2.1/1.8)+"px";}}else{img.src=result[1]+'medium'+result[3];img.style.width=width+"px";img.style.height=height+"px";img.style.marginRight="10px";img.style.cursor="url('/pics/icons/zoom_plus.cur'), pointer";if(id=='img_main'&&article_img){article_img.style.clear='both';}
if(overlay_img){overlay_img.src=result_overlay[1]+'medium'+result_overlay[3];overlay_img.style.width=(width/2.1)+"px";overlay_img.style.height=(width/2.1/1.8)+"px";}}}
var toggle_mouse_over_id=0;var image_big=false;var max_id=0;var user_agent='ok';var jg_num=0;var jg_form=0;var jg_dim1=0;var jg_dim2=0;var jg_dim3=0;var jg_mag_dim=0;var photo_medium_size=0;var photo_large_size=0;var max_slide_navi=10;var ua=navigator.userAgent;var index=ua.indexOf('MSIE');if(index!=-1){var ie_version=parseFloat(ua.substring(index+'MSIE'.length+1));if(ie_version<9){user_agent='ie_below9';}}
function toggle_mouse_over(id){if(id>0){$('#img_gallery_thumb .current').removeClass('current');if(toggle_mouse_over_id==id){toggle_mouse_over_id=0;}else{$('#img_'+id).parents('li.img_gallery').addClass('current');toggle_mouse_over_id=id;}}}
function check_key(e){if($('#click_background').is(':visible')){if($('#container_0_big').is(':visible')||$('#outline_0_big').is(':visible')){switch(e.keyCode){case 27:close_big_img();break;case 37:prev_big_img(max_id);break;case 39:next_big_img(max_id);break;}}else{switch(e.keyCode){case 27:close_info(0);break;}}}}
function change_image(id){if(id>0&&toggle_mouse_over_id==0){if(jg_num>0&&id==max_id){set_outline(max_id);}else{$('#outline_wrapper').hide();change_img_src(id);change_img_text(id);set_small_img();}}}
function change_img_src(id){var orig_img_link=document.getElementById('orig_img_link');document.getElementById('img_number').innerHTML=id;document.getElementById('img_0').src=document.getElementById('img_medium_'+id).src;document.getElementById('img_0_big').src=document.getElementById('img_large_'+id).src;if(orig_img_link!=null){orig_img_link.href=document.getElementById('img_0').src.replace(/\d+x\d+/,'orig');}}
function set_url(id){if(!id||!$('#logo').size()){return;}
if(history.replaceState){var new_url=location.href.split(location.search||location.hash||/[?#]/)[0];var regex=/(\?|&)?img=\d+/;var url_query_part='';if(location.search.match(regex)){url_query_part=location.search.replace(/(\?|&)?img=\d+/,'$1img='+id);}else if(location.search){url_query_part=location.search+'&img='+id;}else{url_query_part='?img='+id;}
new_url+=url_query_part;if(new_url!=location.href){var data={img:id};history.replaceState(data,null,new_url);}
$('#lang_selector_form').attr('action',new_url);$('.shop_switch_link').each(function(){var link=$(this);var href=link.attr('href');var shop_switch_regex=/(\?|&)img=\d+/;if(href.match(shop_switch_regex)){href=href.replace(shop_switch_regex,'$1img='+id);}else if(href.match(/\?/)){href+='&img='+id;}else{href+='?img='+id;}
link.attr('href',href);});}else{window.location.hash='img-'+id;$('#lang_selector_form').attr('action',window.location);}}
function set_image(id){var text_id=0;set_url(id);if(id==0&&!$('#outline_wrapper').is(':hidden')){return set_outline(0);}else{$('#outline_wrapper').hide();}
toggle_mouse_over(id);if(id>0){change_img_src(id);text_id=id;}else{text_id=parseInt(document.getElementById('img_number').innerHTML);}
if((id>0&&image_big==false)||(id==0&&image_big==true)){set_small_img();hide_big_navi();image_big=false;}else{set_big_img(text_id);image_big=true;}
change_img_text(text_id);}
function set_outline(id){if(jg_num==0)return;set_url(id);toggle_mouse_over(id);if(id>0){document.getElementById('img_number').innerHTML=id;}
var outline_wrapper=document.getElementById('outline_wrapper');$('#outline_wrapper').show();if((id>0&&image_big==false)||(id==0&&image_big==true)){outline_wrapper.style.height=photo_medium_size+'px';outline_wrapper.style.width=photo_medium_size+'px';outline_wrapper.className='outline_small zoom_cursor';outline_wrapper.setAttribute('onclick','set_image(0)');$('#outline_big').hide();$('#outline_0_big').hide();$('#outline_medium').show();set_small_img();if(!jg_arr[jg_num]){jg_arr[jg_num]=new jsGraphics('outline_medium');draw_outline(jg_num,jg_form,jg_dim1,jg_dim2,jg_dim3,jg_mag_dim,1,3);}
hide_big_navi();image_big=false;}else{outline_wrapper.style.height=photo_large_size+'px';outline_wrapper.style.width=(photo_large_size+4)+'px';outline_wrapper.className='shadow_big';outline_wrapper.removeAttribute('onclick');$('#outline_big').show();$('#outline_0_big').show();$('#outline_medium').hide();set_big_img(max_id);if(!jg_arr[jg_num+1]){jg_arr[jg_num+1]=new jsGraphics('outline_big');draw_outline(jg_num+1,jg_form,jg_dim1,jg_dim2,jg_dim3,jg_mag_dim,1,3);}
image_big=true;}
$('#img_0').hide();$('#container_0_big').hide();document.getElementById('img_gallery_comment').style.visibility='hidden';}
function set_big_img(id){enable_background_click('close_big_img()');$('.title_icons').hide();$('.shadow_medium').hide();document.getElementById('img_gallery_thumb').style.display='none';document.getElementById('img_gallery_title').style.display='none';document.getElementById('article_gallery_text').style.display='none';$('#img_gallery_pricing').hide();document.getElementById('img_gallery_title').style.display='none';document.getElementById('img_0').style.display='none';document.getElementById('img_gallery_comment').style.display='none';if($('#img_comment_'+id.toString()).length>0){$('#comment_0_big')[0].innerHTML=($('#img_comment_'+id.toString())[0].innerHTML);}
if(document.getElementById('img_gallery_comment').className!='comment_big'){document.getElementById('img_gallery_comment').className='comment_big';if(user_agent=='ie_below9'){$('#container_0_big').show();set_big_navi(id);}else{$('#container_0_big').show('size',{from:{width:254},to:{width:600}},200,function(){set_big_navi(id);});}
document.getElementById('article_image_gallery').className='image_big';}else{$('#container_0_big').show();set_big_navi(id);}
set_scroll_pos_window(930);}
function set_small_img(){close_background_click();document.getElementById('article_gallery_text').style.display='block';$('#img_gallery_pricing').show();document.getElementById('img_gallery_title').style.display='block';document.getElementById('img_0').style.display='block';document.getElementById('container_0_big').style.display='none';document.getElementById('img_gallery_comment').style.display='block';document.getElementById('img_gallery_comment').className='';document.getElementById('article_image_gallery').className='image_normal';}
function next_big_img(){var id=parseInt(document.getElementById('img_number').innerHTML);if(id>0&&id<max_id){id++;set_big_navi(id);change_big_img(id);}else{document.getElementById('big_right').style.display='none';}}
function prev_big_img(){var id=parseInt(document.getElementById('img_number').innerHTML);if(id>1){id--;set_big_navi(id);change_big_img(id);}}
function set_big_navi(id){document.getElementById('big_img_navi').style.display='block';if(id==1){document.getElementById('big_left').style.display='none';document.getElementById('big_right').style.display='block';}else if(id==max_id){document.getElementById('big_left').style.display='block';document.getElementById('big_right').style.display='none';}else{document.getElementById('big_left').style.display='block';document.getElementById('big_right').style.display='block';}}
function hide_big_navi(){document.getElementById('big_img_navi').style.display='none';document.getElementById('big_left').style.display='none';document.getElementById('big_right').style.display='none';document.getElementById('img_gallery_thumb').style.display='block';document.getElementById('img_gallery_title').style.display='block';$('.title_icons').show();}
function change_big_img(id){document.getElementById('img_number').innerHTML=id;if(jg_num>0&&id==max_id){set_outline(max_id);}else{set_image(id);$('#comment_0_big')[0].innerHTML=($('#img_comment_'+id.toString())[0].innerHTML);}}
function close_big_img(){set_image(0);}
function change_img_text(id){var text=document.getElementById('img_comment_'+id);var li_x=document.getElementById('img_comment_1');while(li_x!=null){if(li_x.style!=null){if(li_x==text){li_x.style.display='block';document.getElementById('img_gallery_comment').style.visibility='visible';}else{li_x.style.display='none';}}
li_x=li_x.nextSibling;}}
function enable_background_click(close_func){if(!document.getElementById('click_background')){var screen_click=document.createElement('div');screen_click.id='click_background';screen_click.setAttribute('onclick',close_func);document.body.setAttribute('onkeyup','check_key(event)');document.body.insertBefore(screen_click,document.getElementById('screen'));}else{document.getElementById('click_background').setAttribute('onclick',close_func);document.getElementById('click_background').style.display='block';}}
function close_background_click(){if(document.getElementById('click_background')){document.getElementById('click_background').style.display='none';}}
function open_info(id){enable_background_click("close_info('"+id+"')");if(id==0){$('[id^=info_block_]').show();}else{$('#info_block_'+id).show();}}
function close_info(id){close_background_click();if(id==0){$('[id^=info_block_]').hide();}else{$('#info_block_'+id).hide();}
read_ok=true;}
function go_back(default_url){if(document.referrer!=''){history.back();}else if(default_url!=''){window.location.href=default_url;}else{window.location.href='/';}}
function display_vat(id){enable_background_click("close_info('"+id+"')");document.getElementById('info_block_'+id).style.display='block';}
function display_mag_info(id,form,dim1,dim2,dim3){var outline_div=document.getElementById('info_block_'+id);enable_background_click("close_info('"+id+"')");if(!jg_arr[id]){jg_arr[id]=new jsGraphics("info_block_"+id);draw_outline(id,form,dim1,dim2,dim3,1,1,4);outline_div.style.height="100px";outline_div.style.display="block";}else if(outline_div.style.display!="block"){outline_div.style.display="block";}else{outline_div.style.display="none";}}
function set_scroll_pos(id){var form=document.getElementById('form_'+id);var scr_pos_xy=get_scroll_xy();if(scr_pos_xy[0]>0||scr_pos_xy[1]>0){if(form){for(i=0;i<2;i++){var hiddenField=document.createElement('input');hiddenField.setAttribute('type','hidden');hiddenField.setAttribute('name','scroll'+i);hiddenField.setAttribute('value',scr_pos_xy[i]);form.appendChild(hiddenField);}}}}
function get_scroll_xy(){var scr_x=0,scr_y=0;if(typeof(window.pageYOffset)=='number'){scr_y=window.pageYOffset;scr_x=window.pageXOffset;}else if(document.body&&(document.body.scrollLeft||document.body.scrollTop)){scr_y=document.body.scrollTop;scr_x=document.body.scrollLeft;}else if(document.documentElement&&(document.documentElement.scrollLeft||document.documentElement.scrollTop)){scr_y=document.documentElement.scrollTop;scr_x=document.documentElement.scrollLeft;}
return[scr_x,scr_y];}
function toggle_img(id){if($('#'+id).is(":visible")){close_background_click();$('.zoom_cursor').removeClass('minus');$('#'+id).hide();}else{enable_background_click("toggle_img('"+id+"')");$('.zoom_cursor').addClass('minus');$('#'+id).show();}}
function set_scroll_pos_window(min_height){var scroll_y=window.pageYOffset;var scroll_x=window.pageXOffset;var window_w=document.documentElement.clientWidth;var window_h=document.documentElement.clientHeight;if(window_h<min_height){if(scroll_y<(min_height-window_h)){window.scrollTo(scroll_x,min_height-window_h);}}}
function init_gallery(medium_size,large_size,num,form,dim1,dim2,dim3,mag_dim){photo_medium_size=medium_size;photo_large_size=large_size;jg_num=num;jg_form=form;jg_dim1=dim1;jg_dim2=dim2;jg_dim3=dim3;jg_mag_dim=mag_dim;$("#img_0").addClass("zoom_cursor");$("#js_outline_icon").show();max_id=$('#img_gallery_thumb li').last().find('img').first().attr('id').match(/img_(\d+)/)[1];var query_matches=window.location.search.match(/img=(\d+)/);if(query_matches&&query_matches[1]&&max_id){var query_id=query_matches[1];if(query_id==max_id){set_outline(max_id);}}
var hash=window.location.hash;if(max_id){matches=hash.match(/img-(\d+)/);if(matches&&matches[1]){var id=matches[1];if(id==max_id){set_outline(max_id);}else{set_image(matches[1]);}}}}
function init_slide(max_navi){max_slide_navi=max_navi;$(".slide_link").click(function(){slide_project($(this)[0]);return false;});}
function slide_project(obj){var slide_width=$('#projects_using_article').width();var slide_to="";var navi_offset=Math.round(max_slide_navi/2);var last_id=parseInt($('.slide_nav .last')[0].hash.substr(7));if($(obj).hasClass("hidden")||$(obj).hasClass("current")){return true;}else if($(obj).hasClass("prev")){obj=$('.slide_nav .current').prev()[0];slide_to="+="+slide_width;}else if($(obj).hasClass("next")){obj=$('.slide_nav .current').next()[0];slide_to="-="+slide_width;}else if($(obj).hasClass("first")){obj=$('.slide_nav #link_1')[0];slide_to="0";}else if($(obj).hasClass("last")){obj=$('.slide_nav #link_'+last_id.toString())[0];slide_to="-"+(slide_width*(last_id-1));}else{slide_to="-"+(slide_width*(parseInt(obj.hash.substr(7))-1));}
$(".all_slides").animate({left:slide_to+"px"});$('.slide_nav .current').removeClass('current');$(obj).addClass('current');if($('.slide_link.current').prev().hasClass('prev')){$(".slide_nav .prev").addClass("hidden");$(".slide_nav .first").addClass("hidden");}else{$(".slide_nav .prev").removeClass("hidden");$(".slide_nav .first").removeClass("hidden");}
if($('.slide_link.current').next().hasClass('last')){$(".slide_nav .next").addClass("hidden");$(".slide_nav .last").addClass("hidden");}else{$(".slide_nav .next").removeClass("hidden");$(".slide_nav .last").removeClass("hidden");}
var request_id=parseInt(obj.hash.substr(7));if(last_id>max_slide_navi){for(var i=1;i<=last_id;i++){if(request_id<=navi_offset){if(i>max_slide_navi){$("#link_"+(i).toString()).addClass("disabled");}else{$("#link_"+(i).toString()).removeClass("disabled");}}else if(request_id>=last_id-navi_offset){if(i<=last_id-max_slide_navi){$("#link_"+(i).toString()).addClass("disabled");}else{$("#link_"+(i).toString()).removeClass("disabled");}}else{if(i<=request_id-navi_offset||i>request_id+navi_offset){$("#link_"+(i).toString()).addClass("disabled");}else{$("#link_"+(i).toString()).removeClass("disabled");}}}}}
function floating_cart_preview(){$(window).scroll(function(){var cart_preview=$('#cart_preview');if($(window).scrollTop()>180){cart_preview.addClass('floating');cart_preview.css('top',$(window).scrollTop()-180);}else{cart_preview.removeClass('floating');cart_preview.css('top',0);}});}