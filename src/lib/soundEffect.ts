class SoundEffect {
  private audioContext: AudioContext;
  private names: string[];
  private sources: Map<string, string>;
  private audioBuffers: Map<string, AudioBuffer>;
  onload: () => void;

  constructor() {
    window.AudioContext = window.AudioContext || (<any>window).webkitAudioContext;
    this.audioContext = new AudioContext();
    this.sources = new Map<string, string>();
    this.audioBuffers = new Map();
    this.names = [];
  }

  pushSource(source: string, name: string) {
    this.sources.set(name, source);
    this.names.push(name);
  }

  private async loadBuffer(url: string) {
    return new Promise<AudioBuffer>((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open("GET", url, true);
      request.responseType = "arraybuffer";
      request.onload = () => {
        this.audioContext.decodeAudioData(request.response, (buffer) => {
          resolve(buffer);
        }, (error) => {
          reject(error);
        });
      }
      request.onerror = (e) => {
        console.error(`XHR Request error: ${e}`);
        reject(e);
      }
      request.send();
    })
  }

  async load() {
    for(const name of this.names) {
      const buffer = await this.loadBuffer(this.sources.get(name));
      if(buffer) {
        this.audioBuffers.set(name, buffer);
      }
    }
    if(this.onload) {
      this.onload();
    }
  }

  play(name: string) {
    if(!this.audioBuffers.has(name)) {
      console.log(`none audio name [${name}]`);
      return;
    }
    const source = this.audioContext.createBufferSource();
    source.buffer = this.audioBuffers.get(name);
    source.connect(this.audioContext.destination);
    source.start();
  }

  dispose() {
    this.audioContext = null;
    this.audioBuffers = null;
    this.sources = null;
  }

}

export default SoundEffect;