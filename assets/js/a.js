$.fn.knStory = function (options) {
    var meM = this;
    // This is the easiest way to have default options.
    var settings = $.extend({
        dataView: null
    }, options);
    var lWord = this.find(".list-btn-word");

    this.mainFn = {
        isLoading: false,
        section: null,
        cacheWords: [],
        cacheWordsBt: [],
        cacheUrlAudio: [],
        tmS: null,
        wtype: ["", "noun", "adjective", "adverb", "verb", "5", "6", "7", "8", "9", "10", "11", "12", "13"],
        init: function () {
            var me = this;
            var nd = new Date();
            me.screenH = $(window).height();
            me.nTime = nd.getTime();
            me.idn = settings.dataView.idn;
            me.author = settings.dataView.author;
            me.hint = settings.dataView.hint;
            me.renderWordBt();
            me.renderHint();
            me.renderAuthor();
            me.setEvent();
            console.log(me.idn);
            console.log(me.author);
            console.log(me.hint);
        },
        scrollToMe(el) {
            var me = this;
            if (me.tmS) clearTimeout(me.tmS);
            me.tmS = setTimeout(function () {
                let eTop = $(el).offset().top;
                let wH = $(window).height();
                $('html,body').animate({
                    scrollTop: eTop - wH / 2
                }, 'slow').animate({
                    scrollTop: eTop - (wH / 2) + 1
                }, 'fast');

            }, 200);
        }
        ,
        renderWordBt: function () {
            var me = this;
            let resHtml = '';
            meM.find(".knhl").each(function (w) {
                var kw = me.repWord($(this).html());
                if (me.cacheWordsBt.indexOf(kw) === -1) {
                    me.cacheWordsBt.push(kw);
                    resHtml += ' <button class="btn knhl hl-no-sort">' + kw + '</button> ';
                }
            });
            lWord.append(resHtml);
            resHtml = '';
            me.cacheWordsBt.sort();
            me.cacheWordsBt.forEach(function (w) {
                resHtml += ' <button class="btn knhl hl-sort d-none">' + w + '</button> ';
            });
            lWord.append(resHtml);
        },
        transformer(arr) {
            var me = this;
            let image = '/wp-content/themes/kndict/img/kn-story.jpg';
            let resHtml = '';
            let tta = arr.length;
            if (tta < 4) {
                for (var i = 0; i < 4; i++) {
                    arr.push(arr[i % tta]);
                }
            }
            arr.forEach(function (s, i) {
                var fTime = knFn.formatDate(s.createdAt);
                var simg = (s.image.length > 0) ? me.formatImage(s.image[0]) : false;
                resHtml += me.renderPost(
                    {
                        name: s.name,
                        description: s.des,
                        url: '/truyen-chem/' + s.slug + '.html',
                        image: simg || image,
                        author: s.author,
                        date: fTime.date,
                        views: s.views || 0,
                        reading: true,
                    })
            });
            return resHtml;
        }
        ,
        renderHint: function () {
            var me = this;
            $("#category-hint").html(me.transformer(me.hint));
            setTimeout(function () { me.slider($("#category-hint")); }, 100);
            $(".row-loading").remove();
        },
        renderAuthor: function () {
            var me = this;
            $("#category-author").html(me.transformer(me.author));
            setTimeout(function () { me.slider($("#category-author")); }, 100);
            $(".row-loading").remove();
        }
        ,
        formatImage: function (image) {  // console.log(i)

            if (image && image._id) {
                return '/upload/images/story/' + image._id + '/' + image.name + '.' + image.type;
            } else return false;

        },
        renderPost: function (data) { // class (reading)
            return '<div class="col-md-4 item"><div class="card card-category" ><div class="card-header card-header-image" data-header-animation="true"><a href="' + data.url + '"><img class="lazy img" alt="' + data.name + '" src="/wp-content/themes/kndict/img/loading.svg" data-lazy="' + data.image + '"></a></div><div class="card-body"><div class="card-actions text-center"><i class="far fa-eye"></i>' + data.views + '</div><h4 class="card-title"><a href="' + data.url + '">' + data.name + '</a></h4><div class="card-description">' + data.description + '</div></div><div class="card-footer"><div class="author"><strong>' + data.author + '</strong></div><div class="stats"><span class="post-date">' + data.date + ' <span></span></span></div></div></div></div>';

        }
        ,
        setEvent: function () {
            var me = this;
            //button sort
            $(".btn-sort").click(function () {
                lWord.find('.hl-no-sort').toggleClass("d-none");
                lWord.find('.hl-sort').toggleClass("d-none");
            });
            // set popover
            // meM.find(".knhl").each(function(){
            //   console.log($(this))

            // })


            var reference = meM.find(".knhl");
            var popover = $('#kn-popover');
            popover.hide();

            $('body').on('click', function (e) {
                var target = $(e.target);
                // ne need to reshow and recreate poper when click over popup so return;
                if (target.is($('.close'))) {
                    popover.hide();
                    $(".hl-active").removeClass("hl-active");
                }
                if (target.is(popover) || popover.has(e.target).length) return;

                if (target.is(reference)) {
                    e.preventDefault();
                    popover.show();
                    var popper = new Popper(target, popover, {
                        placement: 'top',
                    });

                } else {
                    popover.hide();
                    $(".hl-active").removeClass("hl-active");
                }
            });

            // meM.find(".knhl").popover({
            //   html: true,
            //   title: '<span class="title-popover text-info">.</span> <button type="button"  class="close">&times;</button>',
            //   placement: 'top',
            //   trigger: 'click',
            //   content: $('.kn-popover')
            // }).on('shown.bs.popover', function (e) {
            //   //console.log('shown triggered');
            //   // 'aria-describedby' is the id of the current popover
            //   var current_popover = '#' + $(e.target).attr('aria-describedby');
            //   var $cur_pop = $(current_popover);
            //   $cur_pop.find('.close').click(function () {
            //     //console.log('close triggered');
            //     $cur_pop.popover('hide');
            //   });

            //   $cur_pop.find('.OK').click(function () {
            //     //console.log('OK triggered');
            //     $cur_pop.popover('hide');
            //   });
            // });
            //hide Event
            $('body').on('click', function (e) {
                // $('.knhl').each(function () {
                //   if (!$(this).is(e.target)
                //     && $(this).has(e.target).length === 0
                //     && $('.popover').has(e.target).length === 0) {
                //     $(this).popover('hide');
                //   }
                // });
            });
            //
            //event click show box
            $(document).on('click', ".knhl", function () {
                var el = this;
                if (me.isLoading) return false;
                $(".hl-active").removeClass("hl-active");
                $(this).addClass("hl-active");
                var word = me.repWord($(this).html());
                var checkLoaded = me.checkLoaded(word);
                if (!checkLoaded) {
                    me.loadWord(word, function (err, data) {
                        if (!err) {
                            if (me.idn.id) { knFn.loadLogo(me.idn.id + '-' + data.dataView.word._id.toString()); }
                            if (data.success)
                                me.renderWord(data.dataView.word || { word: word });
                        } else $('.kn-popover').html('<div class="w-content">Lỗi !</div>');
                        me.scrollToMe(el);
                    })

                } else {
                    me.renderWord(checkLoaded);
                    me.scrollToMe(el);
                }

            });
            $(document).on("click", ".bt-audio", function (e) {
                e.preventDefault(); $(this).addClass("playing");
                var audioID = $(this).data('ai');
                knFn.playAudio('/upload/audio/word/' + me.cacheUrlAudio[parseInt(audioID)])
            });
            var factor = 0.9;
            $("#zoom-plus").click(function () {
                me.setFontSize(1 / factor);
            })
            $("#zoom-minus").click(function () {
                me.setFontSize(factor);
            })
            $("#zoom-normal").click(function () {
                me.setFontSize();
            });
        }
        ,
        repWord: function (str) {
            return str.replace(/(<([^>]+)>)/ig, "").trim().toLowerCase();
        },
        checkLoaded: function (word) {
            var me = this;
            for (var w = 0; w < me.cacheWords.length; w++) {
                if (me.cacheWords[w].word == word) {
                    return me.cacheWords[w]; break;
                }
            }
            return false;
        },
        loadWord: function (word, cb) {
            var me = this; me.isLoading = true;
            $.getJSON("/api/word/view", { s: word })
                .done(function (json) {
                    me.isLoading = false;
                    return cb(null, json)
                })
                .fail(function (jqxhr, textStatus, error) {
                    me.isLoading = false; return cb(1);
                });
        },
        getToken: function (id) {
            var me = this;
            let ecode = md5(id + me.idn.id);
            return ((ecode.indexOf(5) < 0 || ecode.indexOf(9) < 0) ? 5 + ecode.substring(2) + 9 : ecode) + '/' + me.idn.id + '-' + me.nTime;
        },
        createType: function (arrT) {
            var me = this; var res = "";
            arrT.forEach(function (t) {
                res += '<span class="wt ' + me.wtype[t].substring(0, 3) + '">' + me.wtype[t] + '</span>';
            }); return res;
        },
        renderWord: function (word) {
            var me = this;

            if (word._id) {
                if (!word.html) {
                    let pronounce = word.pronounce.toString();
                    let wHtml = '<button type="button"  class="close">&times;</button>';
                    let stA = me.cacheUrlAudio.length;
                    wHtml += '<div class="w-content">';
                    wHtml += '<span class="word-key">' + word.word + '</span>';
                    wHtml += '<span class="word-pronounce">' + ((pronounce) ? '/' + pronounce + '/' : '') + '</span>';
                    //audio
                    wHtml += '<div class="list-audio">';
                    word.audio.forEach(function (a, i) {
                        if (i < 3) {
                            var wtoken = me.getToken(word._id + i);
                            var titleAu = ""; var urlA = "";
                            if (a.indexOf("l_uk_") > -1) titleAu = " UK";
                            else if (a.indexOf("l_us_") > -1) titleAu = " US";
                            else if (a.indexOf("_gb_") > -1) titleAu = " GB";
                            else if (a.indexOf("_us_") > -1) titleAu = " US";
                            wHtml += '<button class="bt-audio" data-ai="' + stA + '" title="' + titleAu + ' Audio"><span>' + titleAu + '</span></button>';
                            urlA = wtoken + '/' + word._id + '/' + i + '_' + word.word;
                            me.cacheUrlAudio.push(urlA);
                            stA++;
                        }

                    });
                    wHtml += '</div>';
                    //mean
                    wHtml += '<div class="w-mean"><i class="far fa-dot-circle"></i> ';
                    for (var m = 0; m < word.mean.length && m < 3; m++)wHtml += word.mean[m].trim() + ', ';
                    wHtml += '</div>';
                    //type  
                    wHtml += '<div class="w-type">' + me.createType(word.types) + '</div>';
                    //close all
                    wHtml += '</div>';
                    $('.kn-popover').html(wHtml);
                    $(".popover-header .title-popover").html(word.word);
                    word.html = wHtml;
                }
                $('.kn-popover').html(word.html);

            }
            else {
                $('.kn-popover').html('<div class="w-content">Không tìm thấy từ !</div>');
            }
            me.cacheWords.push(word);//  


            console.log(me.cacheWords);
        },
        //font size
        getFontSize: function (el) {
            var fs = $(el).css('font-size');
            if (!el.originalFontSize) el.originalFontSize = fs; //set dynamic property for later reset  
            return parseFloat(fs);
        },
        setFontSize: function (fact) {
            var me = this;
            if (me.section === null) {
                me.section = $('.story-content').find('*')
                    .filter(
                        function () {
                            return $(this).clone()
                                .children()
                                .remove()
                                .end()
                                .text().trim().length > 0;
                        }); //filter -> exclude all elements without text
                me.section.push($('.story-content'))
            }
            me.section.each(function () {
                var newsize = fact ? me.getFontSize(this) * fact : this.originalFontSize;
                if (newsize) $(this).css('font-size', newsize);
            });
        },
        slider: function ($slider) {

            $slider.slick({
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 1,
                speed: 500,
                focusOnSelect: true, lazyLoad: 'ondemand',
                slide: 'div',
                autoplay: true,
                prevArrow: '<i class="fa fa-angle-left"></i>',
                nextArrow: '<i class="fa fa-angle-right"></i>',
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }

                ]
            });



        }
    }



    knFn.insertPlayer();
    this.mainFn.init();
    return this;
}

$("#main-story").knStory({ dataView: dataView });


