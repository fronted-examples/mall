<template>
    <section class="book">
        <div class="header clearfix">
            <div class="book-info clearfix">
                <div class="cover-wrap">
                    <img src="https://cdn.wtzw.com/bookimg/public/images/cover/a3c6/e34700dbd8bcabef596ba33eed4d9786_360x480.jpg" />
                    <i class="mask"></i>
                </div>

                <div class="txt-wrap">
                    <div class="title clearfix">
                        <span class="txt">登雀枝</span> 
                        <span class="score">9.1<em>分</em></span>
                    </div>

                    <div class="tags-wrap">
                        <em class="qm-tag tag green middle">完结</em> 
                        <em class="qm-tag tag border middle">
                            <em>签约作品</em>
                        </em> 
                        <em class="qm-tag tag border middle">
                            <a href="https://www.qimao.com/shuku/a-2-a-a-a-a-a-click-1/" target="_blank">古代言情</a>
                        </em> 
                        <em class="qm-tag tag border middle">
                            <a href="https://www.qimao.com/shuku/a-2-209-a-a-a-a-click-1/" target="_blank">宫闱宅斗</a>
                        </em>
                    </div>

                    <div class="sub-title">
                        <span class="txt">作者：
                            <em>
                                <a href="https://www.qimao.com/zuozhe/%E4%BA%8C%E6%9C%88%E6%98%A5_14/" target="_blank">
                                二月春
                                </a>
                            </em>
                        </span> 
                        <span class="txt">主角：
                            <em>安芷</em><em>裴阙</em>
                        </span>
                    </div>

                    <div class="statistics-wrap">
                        <span class="txt">
                            <em>184.83</em>万字
                        </span> 
                        <span class="txt">
                            <em>1.7</em>万次阅读
                        </span> 
                        <span class="txt">
                            <em>1180.4</em>万累计人气值
                        </span>
                    </div>

                    <div class="update-info">
                        <span>更新至</span> 
                        <span class="update-chapter-title">
                            <a href="https://www.qimao.com/shuku/156713-16498989600936/" target="_blank">第936章  番外——姐弟日常5</a>
                        </span> 
                        <span class="update-time">2022-04-14 09:16:07</span>
                    </div>

                    <div class="btns-wrap clearfix">
                        <a href="javascript:void(0);" target="" class="qm-btn item inline-block important large radius">
                            开始阅读
                        </a> 
                        <a href="javascript:void(0);" target="" class="qm-btn item inline-block default large radius">
                            加入书架
                        </a> 
                    </div>
                </div>
            </div>

            <div class="author-information">
                <div class="author clearfix">
                    <div class="wrap-pic">
                        <a href="https://www.qimao.com/zuozhe/%E4%BA%8C%E6%9C%88%E6%98%A5_14/" target="_blank">
                            <img src="https://cdn.qimao.com/bookimg/zww/upload/avatar/8/1594282295794851.jpg" width="60px" height="60px">
                        </a>
                    </div> 
                    
                    <div class="wrap-info">
                        <div class="author-name">
                            <a href="https://www.qimao.com/zuozhe/%E4%BA%8C%E6%9C%88%E6%98%A5_14/" target="_blank">
                                二月春
                            </a>
                        </div> 
                        <a href="https://www.qimao.com/zuozhe/%E4%BA%8C%E6%9C%88%E6%98%A5_14/" target="_blank" class="author-information-tag">
                            <div class="author-tag level small">
                                <div class="author-tag-pic">
                                    <img src="https://cdn-front.qimao.com/qimao/img/author/level-tag/level5.2fd70ee.png" height="24px" width="auto">
                                </div>
                            </div>
                        </a>
                    </div>
                </div> 
                
                <ul class="author-works-data-list clearfix works-data-list default">
                    <li class="author-works-data-list-item">
                        <div class="num">
                            <em>3</em>本
                        </div> 
                        
                        <div class="desc">作品总数</div>
                    </li> 
                    
                    <li class="author-works-data-list-item">
                        <div class="num">
                            <em>328.14</em>万
                        </div> 
                        <div class="desc">累计字数</div>
                    </li> 
                    
                    <li class="author-works-data-list-item">
                        <div class="num">
                            <em>930</em>天
                        </div> 
                        <div class="desc">创作天数</div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="body">
            <div class="body-content">
                <div class="switch clearfix">
                    <span class="switch-item" :class="[currentIndex === index ? 'is-active' : '']" v-for="(item, index) of switches" :key="index" @click="onSwitchChange(item, index)">{{ item.label }}</span>
                    <div class="clearfix"></div>
                </div>

                <div class="switch-component">
                    <div class="instroduction-wrap" v-if="!currentIndex">
                        <div class="instroduction-item">
                            <div class="instroduction-title">
                                <span>简介</span>
                            </div>

                            <div class="instroduction-txt">
                            《王牌对王牌》推荐爆款大女主小说！ 安芷知道裴阙未来会权倾朝野，成为万人之上的首辅重臣。 
                            不曾想，如此尊贵俊逸的裴阙，会在她被退婚后登门求亲，还把她宠成全京都最骄纵的女子。 
                            —— 那时退婚，安芷只想离裴阙远远的。 可再见那日，他却负手走来，嘴角带着笑意，
                            眼里好似藏着漫天星火，一见难忘的面孔，周身又带了几分不羁。 一句四叔还没喊出口，
                            便听到裴阙唤她“安妹妹”。 自此往后，裴阙就把她宠成全京都最娇纵的女子。
                            </div>
                        </div>

                        <div class="instroduction-item">
                            <div class="instroduction-title">
                                <span>第1章 重生</span>
                            </div>

                            <div class="instroduction-txt">
                                <div data-v-273a30e4="" data-v-093c045c="" class="article mask">
                                    <p>早春多雨，天空阴沉沉地下着沥沥细雨，如绢丝般又轻又细。</p><p>安芷站在长廊下，娇艳的面庞带着微微忧色，昨儿宿醉夜归，头还隐隐作痛。</p><p>丫鬟冰露从远处走来，眉心微拧，眼眶红红的，停至主子跟前时，还没开口，便听到主子先问了一句:</p><p>“是裴钰来了？”</p><p>冰露鼻头一酸，点头说是。方才她与前院来催的人吵了一架，怎么想，都为自个主子不服气。</p><p>“那走吧。”安芷淡淡应了一声，转身往前院走去。</p><p>“姑娘，待会瞧见裴家哥儿，您可别再搭理他了，为这样的人生气，不值当。”冰露从小跟着主子长大，情谊深厚，裴钰这次做得过分，为了一个私生女而要退了嫡长女的婚事，让她家姑娘成了满京都的笑柄，一想到此，冰露就恨不得扒了那对狗男女的皮。</p><p>安芷冷哼一声，并不在意，“放心吧，你家姑娘还没那么丢面。”</p><p>听此，冰露愣在原地诧异了一会，她可是清楚自家姑娘有多钟情裴钰，就昨儿裴钰私下约了姑娘要退婚，为这，姑娘可是头回醉酒，还大闹了酒楼。好在每次悄悄出门，姑娘都是扮成小厮模样，不然这事若被老爷知晓，满院子的人都别活了。</p><p>这会子，冰露不知道的是，经昨儿那场醉酒，她家姑娘已是十年后重生回来的。</p><p>起初醒来，安芷还有一丝茫然，后来是欢喜到激动。上天总算对她不薄，让她有重来的机会。</p><p>上辈子，也是同样的一天，裴钰带着父亲的私生女安蓉来安府退婚，当时安芷虽伤心，却以为能用真情感动裴钰，坚持嫁给裴钰。</p><p>后来呢？</p><p>是五年活寡，还有五年的后院囚禁。</p><p>她还记得，在她重生前的那一夜，也是这么一个下雨天，不过那日暴雨急促，雨点“噼啪”打在她身上，刺骨的凉意让人瑟瑟发抖。</p><p>“姐姐真是不懂怜惜自个，瞧瞧，你面黄肌瘦，且瘦如枯骨，若是被夫君瞧见了，他定会更加厌恶。”不远处传来一声浅笑，随后不久，有双精致的绣花鞋缓缓步入眼帘，安芷艰难抬头，来的正是安蓉。</p><p>裴钰为了给安蓉一个正妻的名分，谋划了十年，先陷害安芷哥哥造反，又设计坏了安芷的名节。</p><p>这些，都是那一晚安蓉和安芷说的。</p><p>其实，在婚后第二年，安芷就想通要和离，可裴钰却不肯，他要安芷体验被人唾骂的滋味。</p><p>后来，安芷确实生不如死。</p><p>重新走在安府的长廊里，此时安芷还没嫁给裴钰，她还有机会把握自己的人生，哥哥刚在军营崭露头角，是建功立业的好时机。</p><p>一切，都还来得及。</p><p>这一世，有她在，安蓉和她母亲徐氏就别妄想写进安家族谱，至于裴钰，更是有多远滚多远。</p><p>思绪这么一转，当安芷踏进健安堂的门槛时，便看到那一对‘璧人’，碍眼得很。</p><p>正厅里，安蓉只坐了一半的椅子，安成邺每说一句话，她便柔声应和一句。乖巧，又温顺。</p><p>她曾来过好几次安家，不过都是偷偷的，在安芷不在的时候。</p><p>那时候，安蓉就想住进这座比她和母亲住的小弄堂，敞亮了不知多少的富丽宅院。</p><p>而今天，她终于能有机会了。</p><p>念此，安蓉的余光，不由娇羞地往上首瞥去。</p><p>裴钰护在她身侧，青衣长靴，身如皎月，一举一动皆是儒雅贵气。</p><p>而如今，清贵如裴钰，竟然愿意为了她，扯下脸面亲自来退婚。</p><p>安蓉心中，得意又欣喜。</p><p>安成邺捋着长须，比起高傲的嫡女安芷，他更喜欢温顺贴心的安蓉，反正只要是他安家的女儿，哪个和裴家联姻，他都可以，“蓉儿啊，父亲不是迂腐的人，既然你们自由相爱，那父亲也没什么好说的。待会等你姐姐来了，你跟她赔个礼就行。”</p><p>安蓉轻声答了句是，小心翼翼地朝裴钰看了一眼，裴钰给了她一个肯定的点头，让她别太担心，一切有他在。</p><p>安芷迈进正厅时，就看到这幅琴瑟和谐的画面，眉头微蹙，坐了下来。</p><p>听到安蓉喊自己姐姐，安芷连个余光都没给，直接问安成邺，“父亲急急唤我来，就是想让我看我的未婚夫和一个外室女私通吗？”</p><p>“你！”安成邺面色僵住，不过这事确实是安蓉和裴钰不对，安芷会生气是正常。他敛了敛神色，慈爱地望向安芷，“芷儿，既然他们两个的事你都知道了，那就把订婚信物拿来，把婚事退了吧。”</p><p>“退是肯定要退。”安芷哼了声，她背依旧挺直，和对面畏畏缩缩的安蓉一比，明眼人都能看出来谁是安家正牌小姐。</p><p>光从气度上来讲，安芷就比安蓉好了千万倍，更别提安芷还是京都第一美人，在容貌上胜了又不知多少。</p><p>从裴钰看上安家私生女时，就有不少人背地里骂他瞎了眼，还有人说他是中了安蓉的小人，才会迷了心智。</p><p>“不过嘛。”安芷目光冷冷，移向裴钰，她想到自己前世十年的痛苦，还有哥哥的死，旧恨涌上心头，让她此时就想扒了裴钰的皮，“裴少爷和私生女有染，害得我成了满京都的笑话，今日退婚连个长辈都没有，想来这事你们裴家老太爷还不知道吧。不过明路的东西，我可不应。”</p><p>裴钰被安芷说中心事，嘴唇尴尬地抿了下，但还是保持镇定，“安芷妹妹，安伯父已经打算让蓉儿进族谱，请你以后别再喊她私生女，这样对她不礼貌，也显得你不够大气。还有，只要你现在点头同意退婚，我待会就去请母亲。”</p><p>“族谱？”安芷目光冷冽如刀，扫向安成邺。</p><p>在母亲被徐氏活活气死时，安芷就暗暗发誓，只要她活着一日，就绝不允许徐氏和安蓉上安家族谱，她要她们一辈子无名无份，过成地沟里的老鼠。</p><p>安成邺确实是这么打算的，被安芷突然质问，面上挂不住，“芷儿，蓉儿是你亲妹妹，她进安家族谱是天经地义的事。你别用这种眼神看我，我可是你父亲，注意你嫡女的教养。”</p><p>“是啊，我是嫡女，不过子不教父之过，父亲难道没学过吗？”安芷冷漠道，“想来父亲是没学过的，不然也不会偷养外室，气死正妻，还教出另一个抢夺别人未婚夫的女儿，想来这就是父亲口中的教养吧。”</p><p>安成邺面红耳赤，指着安芷说不出话来。</p><p>对面的安蓉瞬间就哭了。</p><p>裴钰心疼地站起来怒瞪安芷，“安芷，你知道我为什么不喜欢你吗，因为你傲慢没有教养，不如蓉儿温顺，不如她体贴，更不如她有家教，她是绝对不会忤逆父亲夫君的！”</p><p>安芷呵呵笑了下。</p><p>她和裴钰的婚事，是她母亲在她满月时订下的。所以从小，安芷便知道自己有个未婚夫，等长大后，裴钰出落得一表人才，她便全心全意备嫁，那时的她也是温顺体贴，事事都依着父亲和裴钰。</p><p>至于她眼下的一身戾气，都是那十年血泪中，一日日积累起来的。</p><p>安芷乐得看裴钰跳脚，“我猜，我是不如安蓉会服侍男人吧。你和安蓉好了不是一天两天，为何今日按捺不住，急急找上门来，什么原因还要我捅破吗？”</p><p>上辈子，在安芷嫁进裴家没多久，裴钰就把安蓉接进裴家，因为安蓉这会已经怀孕了。</p><p>未婚男女私通，还有了孩子，这事闹出去，像裴家那种清誉人家，肯定不会让安蓉进门，还会打下安蓉肚子里的孩子。</p><p>“怎么不说话了？”安芷见裴钰和安蓉都是一脸土色，她站了起来，走到檐下，伸手抓住一把春雨，冰冰凉的，“你们那点事，我早就知道了，之前想着你不过玩玩，眼下既然你要认真退婚，那就请你家长辈来，同时，你还要负荆请罪，一路从你裴家跪到安家，这门婚事我才同意退。不然，我就一纸诉状告到天波府去，到时候安蓉的肚子可藏不了咯。”</p><p>顿了下，安芷回头冲安蓉微微笑下，“当然，只要父亲敢把你写上族谱，我也去告发你未婚私通。”</p><p>在本朝，女子和离、丧夫后改嫁，都是很寻常的事，没人会指摘什么。但律法规定，私通的女子，都要关到贞洁坊，那这后半辈子，会比坐牢还要苦不堪言。</p><p>安蓉脸色瞬间惨白。</p><p>她来时的那点窃喜，这会全没了，心慌得坐不住，她明明做得天衣无缝，不可能会被外人知道，不曾想这事却被安芷知道。</p><p>裴钰生平，最讨厌被人威胁，“安芷，你别太得寸进尺，我和蓉儿规规矩矩，根本没有你说的那回事。”</p><p>“那行啊，咱们找个大夫来瞧瞧呗。”安芷有恃无恐笑着，“若是安蓉没有怀孕，那我不需要你道歉，立马就退婚，你敢吗？”</p><p>裴钰不敢。</p><p>他苦求母亲多日都没用，若不是安蓉的肚子等不了，今天也不会冲动上门。</p><p>可他绝不可能负荆请罪，“安芷，只要你愿意退婚，不论是黄金万贯，还是玉石玛瑙，随你说个数。”这是他最后的妥协，要是安芷再不同意，他就是被老爷子打死，也要给安蓉一个名分。</p><p>安芷不需要钱，更不想要裴钰的钱，张嘴正要否定时，突然听到雨幕里传来清冷的男声。</p><p>“裴钰，你胆肥了啊。”</p><p>寻声转头看去，安芷见到来人穿过雨幕，一身黑衣，墨色的眉尾稍稍上挑，不拘地扫了一眼，清冷而又带着一丝不羁。</p><p>是裴阙，裴钰的四叔，京都里颇有盛名的望门子弟，本朝最年轻的状元案首，行事利落果决，出了名的恩怨分明，在不久的将来会成为一人之下的首辅。</p><p>而昨晚，安芷在酒楼喝醉时，便调戏了这位未来权臣。</p><p>不过她昨晚女扮男装，想来裴阙是认不出她来。因为上辈子她嫁给裴钰后，裴阙一直没提过昨晚的事，反而还在裴家挺过她几次。</p><p>她见裴阙和安成邺行了礼，转头刚看向裴钰，裴钰便怕得抖了下肩膀。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Menu v-if="currentIndex" />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { Menu } from '@/components/Book'
export default {
    name: 'Book',
    components: {
        Menu
    },
    data () {
        return {
            switches: [{
                label: '作品介绍'
            }, {
                label: '作品目录'
            }],
            menu: 'Menu',
            desc: 'desc',
            currentIndex: 0,
            currentItem: null
        }
    },
    methods: {
        onSwitchChange (item, index) {
            this.currentItem = item
            this.currentIndex = index
        }
    }
}
</script>

<style lang="scss" scoped>
.book {
    background-color: #f8f8f8;
    .header {
        width: 1200px;
        margin: 0 auto;
        padding: 24px 0 32px;

        .book-info {
            min-height: 260px;
            width: 860px;
            display: inline-block;

            .cover-wrap {
                float: left;
                width: 195px;
                height: 100%;
                box-shadow: inset 0 0 1px 0 rgba(0,0,0,.1);
                position: relative;

                img {
                    width: 195px;
                    height: 260px;
                    position: relative;
                    z-index: 5;
                    border-radius: 3px;
                }

                .mask {
                    display: block;
                    position: absolute;
                    bottom: 2px;
                    left: 50%;
                    z-index: 1;
                    margin-left: -83px;
                    width: 166px;
                    height: 16px;
                    overflow: hidden;
                    border-radius: 50%;
                    box-shadow: 0 10px 10px 0 rgba(0,0,0,.1);
                }
            }

            .txt-wrap {
                float: right;
                width: 633px;
                height: 100%;
                position: relative;

                .title {
                    .txt {
                        float: left;
                        max-width: 560px;
                        height: 34px;
                        line-height: 34px;
                        font-size: 24px;
                        font-weight: 700;
                        color: #222;
                        overflow: hidden;
                    }
                }

                .score {
                    float: left;
                    height: 34px;
                    line-height: 32px;
                    margin-left: 16px;
                    font-size: 26px;
                    font-weight: 700;
                    color: #fca000;
                }

                .tags-wrap {
                    margin-top: 8px;
                    .qm-tag {
                        line-height: 22px;
                        height: 20px;
                        overflow: hidden;
                        font-size: 12px;
                        border-radius: 4px;
                        padding: 2px 4px;
                        display: inline-block;
                        color: #fff;
                        margin-left: 12px;
                        vertical-align: top;

                        &:first-child {
                            margin-left: 0;
                        }

                        &:not(:first-child) {
                            margin-left: 8px;
                        }
                    }

                    .green {
                        background: #12b262;
                    }

                    .middle {
                        height: 22px;
                        line-height: 22px;
                        padding: 0 6px;
                        font-size: 14px;
                    }

                    .border {
                        display: inline-block;
                        border-radius: 4px;
                        border: 1px solid #ddd;
                        color: #666;
                        height: calc(100% - 2px);
                        line-height: normal;
                        vertical-align: top;
                    }

                    a {
                        color: #666;
                    }

                    em {
                        font-style: normal;
                        padding: 0 6px;
                    }
                }

                .sub-title {
                    margin-top: 12px;
                    color: #666;
                    font-size: 14px;
                    line-height: 20px;

                    a {
                        color: #222;
                    }

                    .txt {
                        &:not(:first-child) {
                            margin-left: 24px;
                        }

                        em {
                            color: #222;
                            font-style: normal;
                        }
                    }
                }

                .statistics-wrap {
                    margin-top: 32px;

                    .txt {
                        display: inline-block;
                        font-size: 14px;
                        color: #666;
                        height: 24px;
                        line-height: 24px;

                        &:not(:first-child):before {
                            content: "";
                            display: inline-block;
                            width: 1px;
                            height: 14px;
                            background: rgba(0,0,0,.12);
                            margin: 5px 16px;
                            vertical-align: top;
                        }

                        em {
                            font-size: 18px;
                            font-style: normal;
                            font-weight: 700;
                            color: #222;
                            margin-right: 2px;
                            vertical-align: bottom;
                        }
                    }
                }

                .update-info {
                    margin-top: 28px;
                    font-size: 14px;
                    color: #666;
                    line-height: 20px;

                    &:not(:first-child) span {
                        margin-left: 10px;
                    }

                    .update-chapter-title {
                        a {
                            color: #666;
                        }
                    }
                }

                .btns-wrap {
                    margin-top: 15px;
                    .item {
                        float: left;
                        &:not(:first-child) {
                            margin-left: 24px;
                        }
                    }

                    .qm-btn {
                        min-width: 126px;
                        height: 40px;
                        line-height: 40px;
                        border-radius: 40px;
                        padding: 0 30px;
                        font-size: 16px;
                        display: inline-block;
                        text-align: center;
                        box-sizing: border-box;
                        color: #222;
                        overflow: hidden;
                        cursor: pointer;
                        &:first-child {
                            font-weight: 700;
                            background-image: linear-gradient(90deg,#ffe040,#fcc800);
                            &:hover {
                                background-image: linear-gradient(90deg,#ffd940,#fcc100);
                            }
                        }

                        &.default {
                            border: 1px solid #999;
                            color: #666;
                            &:hover {
                                color: #cc6d29;
                                border-color: #cc6d29;
                            }
                        }
                    }
                }
            }
        }

        .author-information {
            width: 260px;
            background: #fff;
            border-radius: 4px;
            padding: 24px 0;

            float: right;

            .author {
                padding: 0 16px;

                a {
                    display: inline-block;
                    color: #222;
                }
                .wrap-pic {
                    position: relative;
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    float: left;
                    overflow: hidden;
                }

                .wrap-info {
                    float: right;
                    width: 152px;

                    .author-name {
                        font-size: 16px;
                        font-weight: 700;
                        color: #222;
                        line-height: 22px;
                        margin-top: 4px;
                    }

                    .author-information-tag {
                        display: inline-block;
                        margin-top: 8px;
                        height: 24px;

                        .author-tag {
                            display: inline-block;
                            height: 24px;
                            overflow: hidden;

                            .author-tag-pic {
                                height: 100%;
                            }
                        }
                    }
                }
            }

            .works-data-list {
                margin-top: 16px;
                padding: 0 7px;

                .author-works-data-list-item {
                    width: 33.33333%;
                    float: left;
                    padding: 12px 0;
                    text-align: center;
                    font-size: 12px;
                    line-height: 16px;

                    .num {
                        color: #222;

                        em {
                            font-size: 18px;
                            font-family: Arial-BoldMT,Arial;
                            font-weight: 400;
                            line-height: 20px;
                            margin-right: 2px;
                        }
                    }

                    .desc {
                        margin-top: 4px;
                        color: #666;
                    }
                }
            }
        }
    }

    .body {
        background: #fff;
        padding-top: 24px;
        padding-bottom: 16px;
        .body-content {
            width: 1200px;
            margin: 0 auto;
            .switch {
                box-sizing: border-box;
                border-bottom: 1px solid #ebebeb;
                .switch-item {
                    float: left;
                    display: block;
                    width: 72px;
                    height: 55px;
                    line-height: 55px;
                    font-size: 18px;
                    color: #666;
                    position: relative;
                    cursor: pointer;
                    &:first-child {
                        margin-right: 24px;
                    }

                    &.is-active {
                        font-weight: 700;
                        color: #222;

                        &::after {
                            content: "";
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            height: 3px;
                            width: 32px;
                            background: #fcc800;
                            margin: auto;
                            border-radius: 2px;
                        }
                    }
                }
            }

            .switch-component {
                padding-top: 32px;
                .instroduction-wrap {
                    .instroduction-item {
                        border-bottom: 1px solid #ebebeb;
                        padding: 24px 0;

                        &:first-child {
                            padding-top: 0;
                        }
                        .instroduction-title {
                            font-size: 20px;
                            line-height: 26px;
                            color: #222;
                            font-weight: 700;
                        }

                        .instroduction-txt {
                            padding-top: 16px;
                            font-size: 16px;
                            font-weight: 400;
                            color: #222;
                            line-height: 30px;

                            .article {
                                position: relative;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>