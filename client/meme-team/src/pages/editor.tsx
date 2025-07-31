import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Canvas, Image, Textbox, Shadow } from "fabric";

import Masonry from "masonry-layout";
import ImagesLoaded from "imagesloaded";

const memeTemplates = [
  {"id":"234202281","name":"AJ Styles & Undertaker","url":"https:\/\/i.imgflip.com\/3vfrmx.jpg","width":933,"height":525,"box_count":2,"captions":41000},{"id":"84341851","name":"Evil Kermit","url":"https:\/\/i.imgflip.com\/1e7ql7.jpg","width":700,"height":325,"box_count":2,"captions":156250},
  {"id":"354700819","name":"Two guys on a bus","url":"https:\/\/i.imgflip.com\/5v6gwj.jpg","width":762,"height":675,"box_count":2,"captions":22750},
  {"id":"134797956","name":"American Chopper Argument","url":"https:\/\/i.imgflip.com\/2896ro.jpg","width":640,"height":1800,"box_count":5,"captions":184500},
  {"id":"61520","name":"Futurama Fry","url":"https:\/\/i.imgflip.com\/1bgw.jpg","width":552,"height":414,"box_count":2,"captions":310750},
  {"id":"259237855","name":"Laughing Leo","url":"https:\/\/i.imgflip.com\/4acd7j.png","width":470,"height":470,"box_count":2,"captions":105500},
  {"id":"155067746","name":"Surprised Pikachu","url":"https:\/\/i.imgflip.com\/2kbn1e.jpg","width":1893,"height":1893,"box_count":3,"captions":242750},
  {"id":"162372564","name":"Domino Effect","url":"https:\/\/i.imgflip.com\/2oo7h0.jpg","width":820,"height":565,"box_count":2,"captions":36000},
  {"id":"142009471","name":"is this butterfly","url":"https:\/\/i.imgflip.com\/2cjr7j.jpg","width":1587,"height":1425,"box_count":3,"captions":32000},
  {"id":"21735","name":"The Rock Driving","url":"https:\/\/i.imgflip.com\/grr.jpg","width":568,"height":700,"box_count":2,"captions":224750},
  {"id":"208915813","name":"George Bush 9\/11","url":"https:\/\/i.imgflip.com\/3gdsh1.jpg","width":300,"height":180,"box_count":2,"captions":19250},
  {"id":"29617627","name":"Look At Me","url":"https:\/\/i.imgflip.com\/hmt3v.jpg","width":300,"height":300,"box_count":2,"captions":66000},
  {"id":"5496396","name":"Leonardo Dicaprio Cheers","url":"https:\/\/i.imgflip.com\/39t1o.jpg","width":600,"height":400,"box_count":2,"captions":240250},
  {"id":"14371066","name":"Star Wars Yoda","url":"https:\/\/i.imgflip.com\/8k0sa.jpg","width":620,"height":714,"box_count":2,"captions":139750},
  {"id":"145139900","name":"Scooby doo mask reveal","url":"https:\/\/i.imgflip.com\/2eeunw.jpg","width":720,"height":960,"box_count":4,"captions":29250},
  {"id":"129315248","name":"No - Yes","url":"https:\/\/i.imgflip.com\/24zoa8.jpg","width":429,"height":343,"box_count":2,"captions":31750},
  {"id":"309668311","name":"Two Paths","url":"https:\/\/i.imgflip.com\/54d9lj.png","width":416,"height":416,"box_count":3,"captions":22250},
  {"id":"123999232","name":"The Scroll Of Truth","url":"https:\/\/i.imgflip.com\/21tqf4.jpg","width":1280,"height":1236,"box_count":2,"captions":228500},
  {"id":"110133729","name":"spiderman pointing at spiderman","url":"https:\/\/i.imgflip.com\/1tkjq9.jpg","width":800,"height":450,"box_count":2,"captions":59250},
  {"id":"101288","name":"Third World Skeptical Kid","url":"https:\/\/i.imgflip.com\/265k.jpg","width":426,"height":426,"box_count":2,"captions":188500},
  {"id":"342785297","name":"Gus Fring we are not the same","url":"https:\/\/i.imgflip.com\/5o32tt.png","width":700,"height":1000,"box_count":3,"captions":37750},
  {"id":"61556","name":"Grandma Finds The Internet","url":"https:\/\/i.imgflip.com\/1bhw.jpg","width":640,"height":480,"box_count":2,"captions":167750},
  {"id":"72525473","name":"say the line bart! simpsons","url":"https:\/\/i.imgflip.com\/176h0h.jpg","width":395,"height":650,"box_count":3,"captions":28500},
  {"id":"20007896","name":"c'mon do something","url":"https:\/\/i.imgflip.com\/bwu6w.jpg","width":448,"height":519,"box_count":2,"captions":33750},
  {"id":"360597639","name":"whe i'm in a competition and my opponent is","url":"https:\/\/i.imgflip.com\/5youx3.jpg","width":916,"height":900,"box_count":2,"captions":24250},
  {"id":"6235864","name":"Finding Neverland","url":"https:\/\/i.imgflip.com\/3pnmg.jpg","width":423,"height":600,"box_count":3,"captions":165250},
  {"id":"92084495","name":"Charlie Conspiracy (Always Sunny in Philidelphia)","url":"https:\/\/i.imgflip.com\/1itoun.jpg","width":1024,"height":768,"box_count":2,"captions":36250},
  {"id":"605588825","name":"Cheating Coldplay","url":"https:\/\/i.imgflip.com\/a0jvbt.jpg","width":1024,"height":838,"box_count":2,"captions":3250},
  {"id":"249257686","name":"Bugs bunny communist","url":"https:\/\/i.imgflip.com\/44eggm.png","width":460,"height":284,"box_count":2,"captions":47250},
  {"id":"181913649","name":"Drake Hotline Bling","url":"https:\/\/i.imgflip.com\/30b1gx.jpg","width":1200,"height":1200,"box_count":2,"captions":1438750},
  {"id":"87743020","name":"Two Buttons","url":"https:\/\/i.imgflip.com\/1g8my4.jpg","width":600,"height":908,"box_count":3,"captions":1125000},
  {"id":"112126428","name":"Distracted Boyfriend","url":"https:\/\/i.imgflip.com\/1ur9b0.jpg","width":1200,"height":800,"box_count":3,"captions":1134500},
  {"id":"222403160","name":"Bernie I Am Once Again Asking For Your Support","url":"https:\/\/i.imgflip.com\/3oevdk.jpg","width":750,"height":750,"box_count":2,"captions":321250},
  {"id":"124822590","name":"Left Exit 12 Off Ramp","url":"https:\/\/i.imgflip.com\/22bdq6.jpg","width":804,"height":767,"box_count":3,"captions":703500},
  {"id":"131087935","name":"Running Away Balloon","url":"https:\/\/i.imgflip.com\/261o3j.jpg","width":761,"height":1024,"box_count":5,"captions":582000},
  {"id":"217743513","name":"UNO Draw 25 Cards","url":"https:\/\/i.imgflip.com\/3lmzyx.jpg","width":500,"height":494,"box_count":2,"captions":616750},
  {"id":"97984","name":"Disaster Girl","url":"https:\/\/i.imgflip.com\/23ls.jpg","width":500,"height":375,"box_count":2,"captions":407000},
  {"id":"80707627","name":"Sad Pablo Escobar","url":"https:\/\/i.imgflip.com\/1c1uej.jpg","width":720,"height":709,"box_count":3,"captions":236500},
  {"id":"135256802","name":"Epic Handshake","url":"https:\/\/i.imgflip.com\/28j0te.jpg","width":900,"height":645,"box_count":3,"captions":244000},
  {"id":"131940431","name":"Gru's Plan","url":"https:\/\/i.imgflip.com\/26jxvz.jpg","width":700,"height":449,"box_count":4,"captions":351750},
  {"id":"252600902","name":"Always Has Been","url":"https:\/\/i.imgflip.com\/46e43q.png","width":960,"height":540,"box_count":2,"captions":214250},
  {"id":"129242436","name":"Change My Mind","url":"https:\/\/i.imgflip.com\/24y43o.jpg","width":482,"height":361,"box_count":2,"captions":656750},
  {"id":"322841258","name":"Anakin Padme 4 Panel","url":"https:\/\/i.imgflip.com\/5c7lwq.png","width":768,"height":768,"box_count":3,"captions":130750},
  {"id":"4087833","name":"Waiting Skeleton","url":"https:\/\/i.imgflip.com\/2fm6x.jpg","width":298,"height":403,"box_count":2,"captions":466250},
  {"id":"438680","name":"Batman Slapping Robin","url":"https:\/\/i.imgflip.com\/9ehk.jpg","width":400,"height":387,"box_count":2,"captions":650500},
  {"id":"161865971","name":"Marked Safe From","url":"https:\/\/i.imgflip.com\/2odckz.jpg","width":618,"height":499,"box_count":2,"captions":207750},
  {"id":"102156234","name":"Mocking Spongebob","url":"https:\/\/i.imgflip.com\/1otk96.jpg","width":502,"height":353,"box_count":2,"captions":442250},
  {"id":"247375501","name":"Buff Doge vs. Cheems","url":"https:\/\/i.imgflip.com\/43a45p.png","width":937,"height":720,"box_count":4,"captions":364500},
  {"id":"188390779","name":"Woman Yelling At Cat","url":"https:\/\/i.imgflip.com\/345v97.jpg","width":680,"height":438,"box_count":2,"captions":385000},
  {"id":"93895088","name":"Expanding Brain","url":"https:\/\/i.imgflip.com\/1jwhww.jpg","width":857,"height":1202,"box_count":4,"captions":468000},
  {"id":"309868304","name":"Trade Offer","url":"https:\/\/i.imgflip.com\/54hjww.jpg","width":607,"height":794,"box_count":3,"captions":116500},
  {"id":"91538330","name":"X, X Everywhere","url":"https:\/\/i.imgflip.com\/1ihzfe.jpg","width":2118,"height":1440,"box_count":2,"captions":384000},
  {"id":"110163934","name":"I Bet He's Thinking About Other Women","url":"https:\/\/i.imgflip.com\/1tl71a.jpg","width":1654,"height":930,"box_count":2,"captions":176000},
  {"id":"79132341","name":"Bike Fall","url":"https:\/\/i.imgflip.com\/1b42wl.jpg","width":500,"height":680,"box_count":3,"captions":136000},
  {"id":"100777631","name":"Is This A Pigeon","url":"https:\/\/i.imgflip.com\/1o00in.jpg","width":1587,"height":1425,"box_count":3,"captions":231000},
  {"id":"178591752","name":"Tuxedo Winnie The Pooh","url":"https:\/\/i.imgflip.com\/2ybua0.png","width":800,"height":582,"box_count":2,"captions":268000},
  {"id":"61579","name":"One Does Not Simply","url":"https:\/\/i.imgflip.com\/1bij.jpg","width":568,"height":335,"box_count":2,"captions":478000},
  {"id":"124055727","name":"Y'all Got Any More Of That","url":"https:\/\/i.imgflip.com\/21uy0f.jpg","width":600,"height":471,"box_count":2,"captions":215250},
  {"id":"252758727","name":"Mother Ignoring Kid Drowning In A Pool","url":"https:\/\/i.imgflip.com\/46hhvr.jpg","width":782,"height":1032,"box_count":4,"captions":69500},
  {"id":"427308417","name":"0 days without (Lenny, Simpsons)","url":"https:\/\/i.imgflip.com\/72epa9.png","width":619,"height":403,"box_count":2,"captions":36750},
  {"id":"224015000","name":"Bernie Sanders Once Again Asking","url":"https:\/\/i.imgflip.com\/3pdf2w.png","width":926,"height":688,"box_count":2,"captions":57250},
  {"id":"61544","name":"Success Kid","url":"https:\/\/i.imgflip.com\/1bhk.jpg","width":500,"height":500,"box_count":2,"captions":148750},
  {"id":"101470","name":"Ancient Aliens","url":"https:\/\/i.imgflip.com\/26am.jpg","width":500,"height":437,"box_count":2,"captions":371750},
  {"id":"180190441","name":"They're The Same Picture","url":"https:\/\/i.imgflip.com\/2za3u1.jpg","width":1363,"height":1524,"box_count":3,"captions":175250},
  {"id":"1035805","name":"Boardroom Meeting Suggestion","url":"https:\/\/i.imgflip.com\/m78d.jpg","width":500,"height":649,"box_count":4,"captions":403500},
  {"id":"55311130","name":"This Is Fine","url":"https:\/\/i.imgflip.com\/wxica.jpg","width":580,"height":282,"box_count":2,"captions":149250},
  {"id":"27813981","name":"Hide the Pain Harold","url":"https:\/\/i.imgflip.com\/gk5el.jpg","width":480,"height":601,"box_count":2,"captions":237000},
  {"id":"148909805","name":"Monkey Puppet","url":"https:\/\/i.imgflip.com\/2gnnjh.jpg","width":923,"height":768,"box_count":2,"captions":218500},
  {"id":"3218037","name":"This Is Where I'd Put My Trophy If I Had One","url":"https:\/\/i.imgflip.com\/1wz1x.jpg","width":300,"height":418,"box_count":2,"captions":151250},
  {"id":"558880671","name":"Squid Game","url":"https:\/\/i.imgflip.com\/98qr33.jpg","width":1546,"height":2385,"box_count":2,"captions":22000},
  {"id":"28251713","name":"Oprah You Get A","url":"https:\/\/i.imgflip.com\/gtj5t.jpg","width":620,"height":465,"box_count":2,"captions":213500},
  {"id":"370867422","name":"Megamind peeking","url":"https:\/\/i.imgflip.com\/64sz4u.png","width":540,"height":540,"box_count":2,"captions":89500},
  {"id":"195515965","name":"Clown Applying Makeup","url":"https:\/\/i.imgflip.com\/38el31.jpg","width":750,"height":798,"box_count":4,"captions":122000},
  {"id":"67452763","name":"Squidward window","url":"https:\/\/i.imgflip.com\/145qvv.jpg","width":598,"height":420,"box_count":2,"captions":58500},
  {"id":"177682295","name":"You Guys are Getting Paid","url":"https:\/\/i.imgflip.com\/2xscjb.png","width":520,"height":358,"box_count":2,"captions":62250},
  {"id":"77045868","name":"Pawn Stars Best I Can Do","url":"https:\/\/i.imgflip.com\/19vcz0.jpg","width":624,"height":352,"box_count":2,"captions":48500},
  {"id":"119139145","name":"Blank Nut Button","url":"https:\/\/i.imgflip.com\/1yxkcp.jpg","width":600,"height":446,"box_count":2,"captions":312750},
  {"id":"166969924","name":"Flex Tape","url":"https:\/\/i.imgflip.com\/2reqtg.png","width":510,"height":572,"box_count":3,"captions":74500},
  {"id":"284929871","name":"They don't know","url":"https:\/\/i.imgflip.com\/4pn1an.png","width":671,"height":673,"box_count":2,"captions":45500},
  {"id":"316466202","name":"where monkey","url":"https:\/\/i.imgflip.com\/58eyvu.png","width":1113,"height":629,"box_count":2,"captions":59750},
  {"id":"91545132","name":"Trump Bill Signing","url":"https:\/\/i.imgflip.com\/1ii4oc.jpg","width":1866,"height":1529,"box_count":2,"captions":166250},
  {"id":"171305372","name":"Soldier protecting sleeping child","url":"https:\/\/i.imgflip.com\/2tzo2k.jpg","width":540,"height":440,"box_count":3,"captions":42500},
  {"id":"89370399","name":"Roll Safe Think About It","url":"https:\/\/i.imgflip.com\/1h7in3.jpg","width":702,"height":395,"box_count":2,"captions":331500},
  {"id":"119215120","name":"Types of Headaches meme","url":"https:\/\/i.imgflip.com\/1yz6z4.jpg","width":483,"height":497,"box_count":2,"captions":67000},
  {"id":"101956210","name":"Whisper and Goosebumps","url":"https:\/\/i.imgflip.com\/1op9wy.jpg","width":600,"height":600,"box_count":2,"captions":57500},
  {"id":"533936279","name":"Bell Curve","url":"https:\/\/i.imgflip.com\/8tw3vb.png","width":675,"height":499,"box_count":3,"captions":29750},
  {"id":"206151308","name":"Spider Man Triple","url":"https:\/\/i.imgflip.com\/3eqjd8.jpg","width":600,"height":551,"box_count":3,"captions":36500},
  {"id":"99683372","name":"Sleeping Shaq","url":"https:\/\/i.imgflip.com\/1nck6k.jpg","width":640,"height":631,"box_count":2,"captions":106750},
  {"id":"114585149","name":"Inhaling Seagull","url":"https:\/\/i.imgflip.com\/1w7ygt.jpg","width":1269,"height":2825,"box_count":4,"captions":243750},
  {"id":"247113703","name":"A train hitting a school bus","url":"https:\/\/i.imgflip.com\/434i5j.png","width":920,"height":1086,"box_count":2,"captions":63750},
  {"id":"216523697","name":"All My Homies Hate","url":"https:\/\/i.imgflip.com\/3kwur5.jpg","width":680,"height":615,"box_count":2,"captions":53750},
  {"id":"135678846","name":"Who Killed Hannibal","url":"https:\/\/i.imgflip.com\/28s2gu.jpg","width":1280,"height":1440,"box_count":3,"captions":140000},
  {"id":"224514655","name":"Anime Girl Hiding from Terminator","url":"https:\/\/i.imgflip.com\/3po4m7.jpg","width":581,"height":633,"box_count":2,"captions":53000},
  {"id":"371619279","name":"Megamind no bitches","url":"https:\/\/i.imgflip.com\/65939r.jpg","width":674,"height":734,"box_count":2,"captions":28750},
  {"id":"137501417","name":"Friendship ended","url":"https:\/\/i.imgflip.com\/29v4rt.jpg","width":800,"height":600,"box_count":2,"captions":35750},
  {"id":"221578498","name":"Grant Gustin over grave","url":"https:\/\/i.imgflip.com\/3nx72a.png","width":500,"height":475,"box_count":2,"captions":55500},
  {"id":"226297822","name":"Panik Kalm Panik","url":"https:\/\/i.imgflip.com\/3qqcim.png","width":640,"height":881,"box_count":3,"captions":216500},
  {"id":"50421420","name":"Disappointed Black Guy","url":"https:\/\/i.imgflip.com\/u0pf0.jpg","width":1172,"height":756,"box_count":2,"captions":70500},
  {"id":"187102311","name":"Three-headed Dragon","url":"https:\/\/i.imgflip.com\/33e92f.jpg","width":680,"height":544,"box_count":4,"captions":46500},

];

export default function MemePage() {
  const [selectedMeme, setSelectedMeme] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [textContent, setTextContent] = useState("");
  const [fontFamily, setFontFamily] = useState("Impact");
  const [fontSize, setFontSize] = useState(40);
  const [textColor, setTextColor] = useState("#ffffff");
  const [strokeWidth, setStrokeWidth] = useState(1);
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [shadowDepth, setShadowDepth] = useState(5);
  const [shadowColor, setShadowColor] = useState("#000000");
  const [opacity, setOpacity] = useState(100);
  const [textAlign, setTextAlign] = useState("left");
  const [fontStyle, setFontStyle] = useState({ bold: false, italic: false, underline: false });
  const [savedMemes, setSavedMemes] = useState<string[]>([]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);
  const masonryRef = useRef<Masonry | null>(null);
  const savedMemesMasonryRef = useRef<Masonry | null>(null)

  useEffect(() => {
    if (canvasRef.current && !fabricCanvasRef.current) {
      fabricCanvasRef.current = new Canvas(canvasRef.current, {
        width: 480,
        height: 480,
        backgroundColor: 'transparent',
      });
    }

    const grid = document.querySelector(".memes-container");
    if (grid) {
      ImagesLoaded(grid, () => {
        masonryRef.current = new Masonry(grid, {
          itemSelector: ".grid-item",
          columnWidth: ".grid-sizer",
          percentPosition: true,
          gutter: 8,
        });
      });
    }

    const savedGrid = document.querySelector('.saved-memes-container');
    if(savedGrid) {
      ImagesLoaded(savedGrid, () => {
        savedMemesMasonryRef.current = new Masonry(savedGrid, {
          itemSelector:".saved-grid-item",
          columnWidth:".saved-grid-sizer",
          percentPosition: true,
          gutter:8,
        })
      })
    }

    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
      if (masonryRef.current) {
        masonryRef.current.destroy();
      }
      if (savedMemesMasonryRef.current) {
        savedMemesMasonryRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
  if (selectedMeme && fabricCanvasRef.current) {
    const selectedTemplate = memeTemplates.find((meme) => meme.url === selectedMeme);
    const maxWidth = 600;
    const maxHeight = 600;

    Image.fromURL(selectedMeme, { crossOrigin: "anonymous"}).then((img) => {
        const imgWidth = selectedTemplate?.width || img.width || 480;
        const imgHeight = selectedTemplate?.height || img.height || 480;
        const whRatio = imgWidth / imgHeight;

        let canvasWidth = maxWidth;
        let canvasHeight = maxWidth / whRatio;
        if (canvasHeight > maxHeight) {
          canvasHeight = maxHeight;
          canvasWidth = maxHeight *whRatio;
        }

        fabricCanvasRef.current!.setDimensions({
          width: canvasWidth,
          height: canvasHeight,
        })

        img.scaleToWidth(canvasWidth);
        img.set({
          left: 0,
          top: 0,
          originX: 'left',
          originY: 'top',
        });
        fabricCanvasRef.current!.set("backgroundImage", img);
        fabricCanvasRef.current!.renderAll();
      }).catch((err) => {
        console.error("failed to load image", err)
      });

    setIsEditing(true);
  }
}, [selectedMeme]);

useEffect(() => {
  if(savedMemesMasonryRef.current) {
    ImagesLoaded(".saved-memes-container", () => {
      savedMemesMasonryRef.current?.layout();
    });
  }
}, [savedMemes])

  const addTextToCanvas = () => {
    if (!fabricCanvasRef.current || !textContent) return;

    const text = new Textbox(textContent, {
      left: 50,
      top: 50,
      width: fabricCanvasRef.current.getWidth() - 100,
      fontSize,
      fontFamily,
      fill: textColor,
      stroke: strokeColor,
      strokeWidth,
      shadow: new Shadow({
        color: shadowColor,
        blur: shadowDepth,
      }),
      opacity: opacity / 100,
      textAlign,
      fontWeight: fontStyle.bold ? "bold" : "normal",
      fontStyle: fontStyle.italic ? "italic" : "normal",
      underline: fontStyle.underline,
    });

    fabricCanvasRef.current.add(text);
    fabricCanvasRef.current.setActiveObject(text);
    fabricCanvasRef.current.renderAll();
  };
  const generateMeme = () => {
    if (!fabricCanvasRef.current) return;
    const dataURL = fabricCanvasRef.current.toDataURL({
      format: "png",
      multiplier: 1,
      quality: 1,
    });
    setSavedMemes((prev) => [dataURL, ...prev.slice(0, 19)]);
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "meme.png";
    link.click();
  };

  const handleBack = () => {
    setSelectedMeme(null);
    setIsEditing(false);
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.clear();
      fabricCanvasRef.current.setDimensions({ width: 480, height: 480});
    }
  };

  return (
    <div className="px-8 py-10 gap-10 bg-black flex min-h-screen bg-background text-white">
      <div className="w-3xl space-y-6">
        {!isEditing && (
          <Card className="border border-white/80 bg-background rounded-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Select From Top 100 Memes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
               className="memes-container"
              style={{
                maxHeight: "400px",
                overflowY: 'auto',
                padding: "10px"
              }}
              >
                <div className="grid-sizer w-[200px]"></div>
                {memeTemplates.map((meme) => (
                  <div
                    key={meme.name}
                    className="grid-item cursor-pointer"
                    onClick={() => setSelectedMeme(meme.url)}
                  >
                    <div
                      className="meme-container"
                      style={{
                      width: "200px",
                      height: "150px",
                      backgroundColor: "#1a1a1a",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      transition : 'transform 0.2s',
                    }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    >
                        <img
                          src={meme.url}
                          alt={meme.name}
                          className="w-full h-full object-cover rounded-sm"
                          crossOrigin="anonymous"
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}

        {isEditing && (
          <Card className="container edit-section h-max w-[450px] border border-white/80 bg-background text-white rounded-sm">
            <CardHeader>
              <Button variant="destructive" onClick={handleBack} className="mb-2">
                <i className="fas fa-arrow-left mr-2"></i> Back
              </Button>
              <CardTitle className="text-2xl font-bold">Text</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block mb-1">Text Content</label>
                <Input
                  placeholder="Enter meme text..."
                  className="text-white"
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                />
                <Button
                  className="w-full bg-primary/40 rounded-sm mt-2"
                  onClick={addTextToCanvas}
                >
                  Add Text
                </Button>
              </div>
              <div>
                <label className="block mb-1">Font Family</label>
                <Select value={fontFamily} onValueChange={setFontFamily}>
                  <SelectTrigger className="text-white w-full">
                    <SelectValue placeholder="Impact" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Impact">Impact</SelectItem>
                    <SelectItem value="Arial">Arial</SelectItem>
                    <SelectItem value="Comic Sans MS">Comic Sans</SelectItem>
                    <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                    <SelectItem value="Trebuchet MS">Trebuchet MS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block mb-1">
                  Font Size: <span id="fontSizeValue">{fontSize}</span>
                </label>
                <Slider
                  defaultValue={[fontSize]}
                  min={10}
                  max={100}
                  step={1}
                  onValueChange={(val) => setFontSize(val[0])}
                />
              </div>
              <div>
                <label className="block mb-1">Text Color</label>
                <Input
                  type="color"
                  className="rounded-none border border-primary/50 w-full h-7 p-0"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-1">Stroke Width</label>
                <Input
                  type="number"
                  min="0"
                  max="20"
                  value={strokeWidth}
                  onChange={(e) => setStrokeWidth(Number(e.target.value))}
                  className="text-white"
                />
                <label className="block mb-1 mt-2">Stroke Color</label>
                <Input
                  type="color"
                  className="rounded-none border border-primary/50 w-full h-7 p-0"
                  value={strokeColor}
                  onChange={(e) => setStrokeColor(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-1">Shadow Depth</label>
                <Input
                  type="number"
                  min="0"
                  max="20"
                  value={shadowDepth}
                  onChange={(e) => setShadowDepth(Number(e.target.value))}
                  className="text-white"
                />
                <label className="block mb-1 mt-2">Shadow Color</label>
                <Input
                  type="color"
                  className="rounded-none border border-primary/50 w-full h-7 p-0"
                  value={shadowColor}
                  onChange={(e) => setShadowColor(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-1">Opacity</label>
                <Slider
                  defaultValue={[opacity]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(val) => setOpacity(val[0])}
                />
              </div>
              <div>
                <label className="block mb-1">Text Alignment</label>
                <div className="flex gap-2">
                  <Button
                    variant={textAlign === "left" ? "default" : "outline"}
                    onClick={() => setTextAlign("left")}
                  >
                    <i className="fas fa-align-left">left</i>
                  </Button>
                  <Button
                    variant={textAlign === "center" ? "default" : "outline"}
                    onClick={() => setTextAlign("center")}
                  >
                    <i className="fas fa-align-center">center</i>
                  </Button>
                  <Button
                    variant={textAlign === "right" ? "default" : "outline"}
                    onClick={() => setTextAlign("right")}
                  >
                    <i className="fas fa-align-right">right</i>
                  </Button>
                </div>
              </div>
              <div>
                <label className="block mb-1">Font Style</label>
                <div className="flex gap-2">
                  <Button
                    variant={fontStyle.bold ? "default" : "outline"}
                    onClick={() => setFontStyle({ ...fontStyle, bold: !fontStyle.bold })}
                  >
                    <i className="fas fa-bold">BOLD</i>
                  </Button>
                  <Button
                    variant={fontStyle.italic ? "default" : "outline"}
                    onClick={() => setFontStyle({ ...fontStyle, italic: !fontStyle.italic })}
                  >
                    <i className="fas fa-italic">italic</i>
                  </Button>
                  <Button
                    variant={fontStyle.underline ? "default" : "outline"}
                    onClick={() => setFontStyle({ ...fontStyle, underline: !fontStyle.underline })}
                  >
                    <i className="fas fa-underline">underline</i>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {isEditing && (
          <Card className="h-[200px] w-[450px] border border-white/80 bg-background text-white rounded-sm">
            <CardHeader>
              <CardTitle className="text-3xl font-semibold">Submit</CardTitle>
            </CardHeader>
            <CardFooter>
              <Button
                className="w-full bg-primary/40 rounded-sm"
                onClick={generateMeme}
              >
                Submit Meme
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>

      <div>
        <Card className="h-[700px] w-[700px] bg-background border border-white/80 rounded-sm flex flex-col items-center justify-center p-6">
          <div className="rounded-sm py-4 px-4 border border-primary/50">
            <div className="meme-preview bg-gray-200 h-max w-max flex items-center justify-center relative">
              <canvas ref={canvasRef} className="fabric-canvas-wrapper" />
            </div>
          </div>
          <CardFooter>
            <p className="text-sm text-white/70">
              Customize the text on the meme template! <br />
              Click and drag to move text, use the controls on the left to customize.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}