import wave, struct, math
import os

sr = 44100
d = 30 # seconds

def generate(frequencies, name):
    filepath = os.path.join('public', name + '.wav')
    w = wave.open(filepath, 'w')
    w.setnchannels(1)
    w.setsampwidth(2)
    w.setframerate(sr)
    
    note_duration = 0.5
    notes_in_sequence = len(frequencies)
    
    for i in range(int(d * sr)):
        time_sec = i / sr
        note_index = int(time_sec / note_duration) % notes_in_sequence
        fq = frequencies[note_index]
        
        note_time = time_sec % note_duration
        envelope = math.exp(-note_time * 5.0) 
        
        v = math.sin(fq * 2 * math.pi * time_sec)
        v += 0.5 * math.sin(fq * 2 * 2 * math.pi * time_sec)
        v += 0.25 * math.sin(fq * 3 * 2 * math.pi * time_sec)
        
        v = v * 8000 * envelope
        
        v = max(-32768, min(32767, int(v)))
        w.writeframesraw(struct.pack('<h', v))
    w.writeframes(b'')
    w.close()
    print("Generated", name)

generate([440.0, 554.37, 659.25, 554.37], 'acoustic_chords')
generate([261.63, 329.63, 392.00, 329.63, 261.63, 196.00, 261.63, 392.00], 'warm_ambient')
generate([293.66, 349.23, 440.0, 523.25, 440.0, 349.23], 'jazzy_progression')
