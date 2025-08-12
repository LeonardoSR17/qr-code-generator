"use client";

import {QRCodeCanvas} from 'qrcode.react';
import { FaUpload } from "react-icons/fa";
import { useRef, useState } from 'react';

export default function Home() {
  const [linkValue, setLinkValue] = useState<string>('');
  const [fgcolor, setFgColor] = useState<string>('#000000');
  const [bgcolor, setBgColor] = useState<string>('#ffffff');
  const [logoUrl, setLogoUrl] = useState<string>('/logo.png');
  const [logoSize, setLogoSize] = useState<number>(0.1);
  const qrCodeRef = useRef<HTMLDivElement>(null);

const handLeLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        setLogoUrl(reader.result as string);
      }
    }
    reader.readAsDataURL(file)
  }
}

const handLeDownLoad = () => {
  if (!qrCodeRef.current) return;
  const canvas = qrCodeRef.current.querySelector("canvas");
  if (!canvas) return;
  const link = document.createElement("a");

  link.href = canvas.toDataURL("image/png");
  link.download = "qrcode.png";
  link.click();
}

  return (
    <main className="container">
      <section className="text-container">
        <h1 className="page-title">Gerador de QR Code</h1>
      </section>
      <section className="qr-code-container">
        <div className="qr-code">
          <div className="link-input">
            <label htmlFor="link">
              Digite o seu Link
            </label>
            <input type="text" id="link" placeholder="Seu Link aqui" value={linkValue} onChange={(e) => setLinkValue(e.target.value)}/>
          </div>
          <div className="qr-code-preview">
            <p>QR Code Preview</p>
            <div ref={qrCodeRef}>
             <QRCodeCanvas
               value={linkValue}
                title={linkValue}
                size={200}
               bgColor={bgcolor}
                fgColor={fgcolor}
                imageSettings={{
                  src: logoUrl,
                  x: undefined,
                  y: undefined,
                  height: logoSize,
                  width: logoSize,
                  opacity: 1,
                  excavate: true,
                  crossOrigin: 'anonymous'
                }}
             />
            </div>
          </div>
        </div>
        <div className="qr-code-customization">
          <div className='customization-container'>
            <h3>Cores</h3>
            <div className='input-container colors'>
              <div className='input-box'>
                <label htmlFor="fgcolor">Cor principal</label>
                <input type="color" className='input-color' id='fgcolor' value={fgcolor} onChange={(e) => setFgColor(e.target.value)}/>
              </div>
              <div className='input-box'>
                <label htmlFor="bgcolor">Cor do Fundo</label>
                <input type="color" className='input-color' id='bgcolor'value={bgcolor} onChange={(e) => setBgColor(e.target.value)}/>
              </div>
            </div>
          </div>
          <div className='customization-container'>
            <h3>Logo</h3>
            <div className='input-container'>
              <div className='input-box'>
                <label htmlFor="logo">Insira a sua logo</label>
                <input type="file" className='input-file' id='logo' accept='image/*' onChange={handLeLogoChange}/>
                <button className='input-file-button'><FaUpload />Escolher um arquivo</button>
              </div>
              <div className='input-box'>
                <label htmlFor="logoSize">Tamanho da logo</label>
                <select name="logoSize" id="logoSize" value={logoSize} onChange={(e) => setLogoSize(Number(e.target.value))}>
                  <option value="0.1">Sem logo</option>
                  <option value="24">24px x 24px</option>
                  <option value="38">38px x 38px</option>
                  <option value="50">50px x 50px</option>
                </select>
              </div>
            </div>
          </div>
          <button className='download-button' onClick={handLeDownLoad}>Baixar QR Code</button>
        </div>
      </section>
    </main>
  );
}
