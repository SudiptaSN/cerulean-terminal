"use client";
import React, { useState, useEffect, useRef } from "react";

export default function TerminalApp() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [stage, setStage] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const [locked, setLocked] = useState(true);
  const bottomRef = useRef(null);

  const BOOT_SEQUENCE = [
    "SYSTEM WAKE...",
    "UNAUTHORIZED ACCESS DETECTED.",
    "INITIATING MONROE PROTOCOL...",
    "WARNING: BACKSPACE KEY HAS BEEN DISABLED VIA HARDWARE OVERRIDE. PRECISION IS REQUIRED.",
    " ",
    "> SYSTEM ENCRYPTED. ENTER THE MASTER PASSWORD?"
  ];

  // Auto-scroll to the bottom of the terminal
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Initial boot sequence
  useEffect(() => {
    let delay = 0;
    setHistory([]);
    BOOT_SEQUENCE.forEach((line, index) => {
      setTimeout(() => {
        setHistory((prev) => [...prev, line]);
        if (index === BOOT_SEQUENCE.length - 1) {
          setLocked(false);
        }
      }, delay);
      delay += 800;
    });
  }, []);

  const resetSystem = () => {
    setHistory(["CRITICAL ERROR: MAXIMUM FAILURES REACHED.", "WIPING MEMORY BANKS...", "REBOOTING..."]);
    setTimeout(() => {
      setStage(0);
      setStrikes(0);
      let delay = 0;
      setHistory([]);
      BOOT_SEQUENCE.forEach((line, index) => {
        setTimeout(() => {
          setHistory((prev) => [...prev, line]);
          if (index === BOOT_SEQUENCE.length - 1) {
            setLocked(false);
          }
        }, delay);
        delay += 600; 
      });
    }, 3000);
  };

  const handleWrongAnswer = (command) => {
    const newStrikes = strikes + 1;
    if (newStrikes >= 3) {
      setLocked(true);
      setHistory((prev) => [...prev, `> ${command}`, `ACCESS DENIED. STRIKE 3/3.`]);
      setTimeout(() => resetSystem(), 1500);
    } else {
      setHistory((prev) => [
        ...prev,
        `> ${command}`,
        `ACCESS DENIED. STRIKE ${newStrikes}/3.`
      ]);
      setStrikes(newStrikes);
    }
  };

  const handleCommand = (e) => {
    e.preventDefault();
    if (locked || !input) return;

    const command = input;
    const currentHistory = [...history, `> ${command}`];
    setInput("");
    setHistory(currentHistory);

    // TIER 1: Master Password (SudiptaSN - Case Sensitive)
    if (stage === 0) {
      if (command === "SudiptaSN") {
        setHistory((prev) => [
          ...prev,
          "IDENTITY VERIFIED.",
          " ",
          "> AUDITING INITIATION PROTOCOL... ENTER THE EXACT VOLUME LABEL OF THE PHASE 1 FLASH DRIVE:"
        ]);
        setStage(1);
      } else {
        handleWrongAnswer(command);
      }
    }
    // TIER 2: Timeline Audit
    else if (stage === 1) {
      if (command.toUpperCase() === "UNSUB_01") {
        setHistory((prev) => [
          ...prev,
          "AUDIT PASSED.",
          " ",
          "> VERIFY THE TEMPORAL BYPASS CODE GIVEN TO THE FLESH-AND-BLOOD GUARDIAN:"
        ]);
        setStage(2);
      } else {
        handleWrongAnswer(command);
      }
    }
    // TIER 3: Guardian's Echo
    else if (stage === 2) {
      if (command === "2019") {
        setHistory((prev) => [
          ...prev,
          "GUARDIAN VERIFIED.",
          " ",
          "> UPLOAD THE 4-PART PHYSICAL PAYLOAD... IN STRICT REVERSE CHRONOLOGICAL ORDER OF IGNITION:"
        ]);
        setStage(3);
      } else {
        handleWrongAnswer(command);
      }
    }
    // TIER 4 & 5: Payload Reversal
    else if (stage === 3) {
      if (command === "2937") {
        setLocked(true);
        setHistory((prev) => [...prev, "PAYLOAD ACCEPTED. DECRYPTING MASTER FILE..."]);
        
        setTimeout(() => setHistory(prev => [...prev, "[||        ] 24% - BYPASSING KERNEL..."]), 1500);
        setTimeout(() => setHistory(prev => [...prev, "[||||||    ] 68% - EXTRACTING ASSET..."]), 3000);
        setTimeout(() => setHistory(prev => [...prev, "[||||||||||] 99% - FINALIZING..."]), 4500);
        
        setTimeout(() => setHistory(prev => [...prev, "ERROR: INTEGRITY CHECK TIMEOUT. FATAL EXCEPTION."]), 8000);
        
        setTimeout(() => {
          setHistory(prev => [
            ...prev,
            " ",
            "OVERRIDE SUCCESSFUL.",
            "=========================================",
            "OPERATION CERULEAN COMPLETE. YOU SURVIVED.",
            " ",
            "DECRIPTED ASSET LOCATION: SAFE AND SECURE WITH YOUR MOM",
            "=========================================",
            "HAPPY BIRTHDAY."
          ]);
        }, 11000);

      } else {
        handleWrongAnswer(command);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault();
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes flicker {
          0% { opacity: 0.95; }
          5% { opacity: 0.85; }
          10% { opacity: 0.95; }
          15% { opacity: 1; }
          100% { opacity: 1; }
        }
        .crt-effect {
          position: relative;
          overflow: hidden;
          animation: flicker 0.15s infinite;
        }
        .crt-effect::before {
          content: " ";
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
          z-index: 2;
          background-size: 100% 2px, 3px 100%;
          pointer-events: none;
        }
        .scanline {
          width: 100%;
          height: 100px;
          z-index: 3;
          position: absolute;
          pointer-events: none;
          background: linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(34,197,94,0.1) 50%, rgba(0,0,0,0) 100%);
          animation: scanline 6s linear infinite;
        }
      `}} />
      
      <div className="min-h-screen bg-black text-green-500 p-4 sm:p-8 font-mono text-sm sm:text-lg flex flex-col crt-effect relative">
        <div className="scanline"></div>
        <div className="flex-1 overflow-y-auto mb-4 z-10 break-words whitespace-pre-wrap">
          {history.map((line, index) => (
            <div key={index} className="min-h-[1.5rem] mt-1 tracking-wide" style={{ textShadow: '0 0 5px rgba(34, 197, 94, 0.5)' }}>
              {line}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <form onSubmit={handleCommand} className="flex items-center z-10 border-t border-green-900 pt-4">
          <span className="mr-3 font-bold text-green-400">{">"}</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={locked}
            autoFocus
            className="bg-transparent border-none outline-none flex-1 text-green-400 font-bold disabled:opacity-50 tracking-widest placeholder-green-800"
            spellCheck="false"
            autoComplete="off"
            placeholder={locked ? "PROCESSING..." : ""}
          />
        </form>
      </div>
    </>
  );
}
