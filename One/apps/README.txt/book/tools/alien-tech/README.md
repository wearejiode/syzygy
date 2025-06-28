# transmission.artifact.🛸042  
# discovered: /tools/alien-tech/  
# do not decrypt unless authorized by the Galactic Federation  

This script encodes and decodes text using a custom **glitch-text format**.

```
glitch~ text~ transmission~ detected~
```

## Usage

```bash
# Encode a block of text
python decoderRing.py --encode
```

```bash
# Decode a block of glitch-text
python decoderRing.py
```

Both commands can take input from:

- 🧠 Standard Input (paste or pipe)
- 📜 File redirection
- 🧾 Command-line arguments

### Example

```bash
echo "This is a test." | python decoderRing.py --encode
```

```bash
echo "d~G~V~z~d~C~4~I~G~k~g~c~y~B~z~a~h~R~a~V~8~=" | python decoderRing.py
```

## Format Details

The encoder:
- Reverses each line
- Encodes to Base64
- Inserts `~` between each letter character

The decoder:
- Removes `~` characters
- Decodes Base64
- Reverses back to original

## Why?

🪐 The Galactic Federation stores emotional transmissions  
in encrypted poetic form to avoid unauthorized psy-link exposure.

