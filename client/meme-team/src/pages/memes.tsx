import { Button } from "@/components/ui/button"

import {
    Card,
    CardHeader,
    CardTitle,
    CardFooter,
    CardContent

  } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue

} from "@/components/ui/select"

export default function MemePage() {

    return(
      <div className="px-8 py-10 gap-10 bg-black flex min-h-screen bg-background text-white">
        <div className="w-3xl space-y-6">
          <Card className="h-[450px] w-[300px] border border-white/80 bg-background text-white rounded-sm">
            <CardHeader>
                <CardTitle className="text-2xl font-bold ">Text</CardTitle>
            </CardHeader>       
              <div>
              <CardContent className="space-y-4">
              <label className="block mb-1">Text Content</label>
                <Input placeholder="Enter meme text..." className="text-white"></Input>
                <Button type="submit" className="w-full bg-primary/40 rounded-sm">
                  Add Text
                  </Button>
                <div>
                  <label className="block mb-1">Font Family</label>
                  <Select>
                    <SelectTrigger className="text-white w-full">
                      <SelectValue placeholder="Impact"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Impact" >Impact</SelectItem>
                      <SelectItem value="Arial">Arial</SelectItem>
                      <SelectItem value="Comic sans">Comic sans</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block mb-1">
                    Font Size: <span id="fontSizeValue">40</span>
                    </label>
                  <Slider defaultValue={[40]}
                    min={10}
                    max={100}
                    step={1} 
                    onValueChange={(val) => {
                      const sizeLabel = document.getElementById("fontSizeValue");
                      if (sizeLabel !== null ) {
                        sizeLabel.textContent = val[0].toString()
                      }
                    }}/>
                </div>
                <div>
                  <div></div>
                  <label className="block mb-1">Text Color</label>
                  <Input type="color" className="rounded-none border border-primary/50 w-full h-7 p-0"></Input>
                </div>
              </CardContent>
              </div>
          </Card>        
          <Card className="h-[200px] w-[300px]border border-white/80 bg-background text-white rounded-sm">
            <CardHeader>
              <CardTitle className="text-3xl font-semibold">Submit</CardTitle>
            </CardHeader>
            <CardFooter>
                  <Button type="submit" className="w-full bg-primary/40 rounded-sm">
                  Submit Meme
                  </Button>
            </CardFooter>
        </Card>
      </div>
        <div>
            <Card className="h-[680px] w-[650px]  bg-background border border-white/80 rounded-sm flex flex-column items-center justify-center p-6">
              <div className="rounded-sm py-4 px-4 border border-primary/50">
                <div className="bg-gray-200 h-[480px] w-[480px] flex items-center justify-center relitive">
                  <div className="text-gray-500 text-4xl">+</div>
                </div>
              </div>
              <CardFooter>
              <p className="text-sm text-white/70">
                Customize the text on the meme template! <br/>
                click and drag to move text, use the controls on the left to customize.
              </p>
              </CardFooter>
            </Card>
        </div>
    </div>
    ) 
}
