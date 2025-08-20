# transmission.artifact.🛸042
# discovered: /tools/alien-tech/
# do not decrypt unless authorized by the Galactic Federation
# This script seems to encode and decode text using a custom glitch-text format?

#!/usr/bin/env python3

import argparse
import base64
import re
import sys
from typing import List

def encode_line(line: str) -> str:
    reversed_text = line[::-1]
    base64_text = base64.b64encode(reversed_text.encode()).decode()
    glitch_text = re.sub(r'([A-Za-z])', r'\1~', base64_text)
    return glitch_text

def decode_line(line: str) -> str:
    cleaned_text = re.sub(r'~', '', line)
    try:
        base64_decoded = base64.b64decode(cleaned_text).decode()
        original_text = base64_decoded[::-1]
        return original_text
    except Exception as e:
        return f"[decode error]: {e}"

def main():
    parser = argparse.ArgumentParser(description='Encrypt or decrypt glitch-text line by line.')
    parser.add_argument('--encode', action='store_true', help='Encode input instead of decoding')
    parser.add_argument('text', nargs='*', help='Text to encode/decode (optional, can read from stdin)')

    args = parser.parse_args()

    if args.text:
        input_lines = ' '.join(args.text).splitlines()
    else:
        input_lines = sys.stdin.read().splitlines()
      # Handle empty input


    if not any(line.strip() for line in input_lines):
        print("🛸 Hmm... Nothing to decode, there is.\nProvide input, you must.")
        sys.exit(0)
    if args.encode:
        for line in input_lines:
            print(encode_line(line))
    else:
        for line in input_lines:
            print(decode_line(line))

if __name__ == '__main__':
    main()

# Dev Notes:
# There's something strange included in the artifact.
# The text appears to be encoded in a custom format that resembles glitch text.
# The encoding seems to involve some simple cypher, solvable by an unknown decoder,
# almost like one of those decoderRings you might find in a cereal box...
# but further analysis is needed.
# for now, we are unsure if this is a message or just random noise.
# if only we had a decoderRing to help us out...
# there has to be one around here somewhere, right?
# right?

# a~U~g~g~I~w~==
# a~25h~a~F~Q~g~I~w~==
# d~W~9Z~I~C~M~=
# c~m~9G~I~C~M~=
# Z~25p~c~1U~g~I~w~==
# I~G~V~o~V~C~A~j~
# Y~2l~0Y~2F~s~Y~U~c~g~I~w~==
# b~m~9p~d~G~F~y~Z~W~R~l~R~i~A~j~
# L~n~R~w~a~X~J~j~c~y~B~n~b~m~l~y~I~H~J~l~Z~G~9j~Z~U~Q~g~I~w~==
# L~n~l~s~b~m~8g~Z~X~N~1I~G~R~l~e~m~l~y~b~2h~0d~W~E~g~c~m~9m~I~G~x~v~b~3Q~g~Y~S~B~z~a~S~B~z~a~W~h~0I~C~x~y~Z~W~J~t~Z~W~1l~U~i~A~j~
# L~n~N~l~Y~25l~d~X~F~l~c~25v~Y~y~B~j~a~X~R~j~Y~W~x~h~Z~3J~l~d~G~5p~I~G~5p~I~H~R~s~d~X~N~l~c~i~B~5Y~W~0g~Z~X~N~1I~G~R~l~e~m~l~y~b~2h~0d~W~F~u~V~S~A~j~
# L~n~N~u~b~2l~0Y~W~x~1Z~2V~y~I~G~5v~a~X~R~h~c~m~V~k~Z~U~Y~g~Y~2l~0Y~2F~s~Y~U~c~g~a~H~R~p~d~y~B~l~Y~25h~Z~H~J~v~Y~2N~h~I~G~5p~I~G~R~u~Y~S~B~5b~G~J~p~c~25v~c~H~N~l~c~i~B~l~c~1U~g~I~w~==
# L~m~V~y~d~W~N~l~c~y~B~z~b~m~9p~c~3N~p~b~X~N~u~Y~X~J~0I~H~J~1b~3k~g~Z~G~5h~I~G~V~m~Y~X~M~g~c~3R~l~c~m~N~l~c~y~B~y~d~W~95I~H~B~l~Z~U~s~g~I~w~==
# L~m~R~u~a~W~s~g~e~W~5h~I~G~Z~v~I~H~l~0b~m~F~y~c~m~F~3I~H~l~u~Y~S~B~0d~W~9o~d~G~l~3I~C~x~z~a~S~1z~Y~S~B~k~Z~W~R~p~d~m~9y~c~C~B~z~a~S~B~0c~G~l~y~Y~3M~g~c~2l~o~V~C~A~j~
# L~m~5v~a~X~N~p~d~m~l~k~I~G~h~j~c~m~F~l~c~2V~y~I~H~M~n~b~m~9p~d~G~F~y~Z~W~R~l~R~i~B~j~a~X~R~j~Y~W~x~h~R~y~B~l~a~H~Q~g~Z~m~8g~d~G~N~1Z~G~9y~c~C~B~h~I~H~N~p~I~H~R~w~a~X~J~j~c~y~B~z~a~W~h~U~I~C~M~=
# L~n~N~l~Y~25l~d~X~F~l~c~25v~Y~y~B~k~Z~W~R~u~Z~X~R~u~a~W~51I~H~J~v~I~G~V~z~d~X~N~p~b~S~B~5b~m~E~g~c~m~9m~I~G~V~s~Y~m~l~z~b~m~9w~c~2V~y~I~H~R~v~b~i~B~z~a~S~B~u~b~2l~0Y~X~J~l~Z~G~V~G~I~G~N~p~d~G~N~h~b~G~F~H~I~G~V~o~V~C~A~j~
# L~m~V~y~Y~W~M~g~a~H~R~p~d~y~B~z~Z~W~d~h~c~3N~l~b~S~B~y~d~W~95I~G~V~k~b~2N~l~Z~C~B~k~b~m~E~g~Z~W~R~v~Y~25l~I~G~90I~H~R~p~I~G~V~z~V~S~A~j~
# L~m~V~y~d~W~N~l~c~y~B~k~b~m~E~g~Z~G~V~0c~H~l~y~Y~25l~I~G~V~y~Y~S~B~z~b~m~9p~c~3N~p~b~X~N~u~Y~X~J~0I~H~J~1b~3k~g~d~G~F~o~d~C~B~l~c~n~V~z~b~m~U~g~c~3l~h~d~2x~B~I~C~M~=
# L~n~N~u~Z~X~p~p~d~G~l~j~I~H~N~0a~S~B~m~b~y~B~5Y~2F~2a~X~J~w~I~G~V~o~d~C~B~z~Z~X~V~s~Y~X~Y~g~b~m~9p~d~G~F~y~Z~W~R~l~R~i~B~j~a~X~R~j~Y~W~x~h~R~y~B~l~a~F~Q~g~I~w~==
# L~n~l~s~Z~W~Z~h~c~y~B~l~d~G~F~j~a~W~51b~W~1v~Y~y~B~k~b~m~E~g~c~3R~l~c~m~N~l~c~y~B~y~d~W~95I~H~R~j~Z~X~R~v~c~n~A~g~b~3Q~g~Z~25p~c~i~B~y~Z~W~R~v~Y~2V~k~I~H~N~p~a~H~Q~g~Z~X~N~V~I~C~M~=
# L~n~l~n~b~2x~v~b~m~h~j~Z~X~Q~g~Y~2l~0Y~2F~s~Y~W~d~y~Z~X~R~u~a~S~B~m~b~y~B~5d~G~l~1b~m~V~n~b~m~k~g~Z~W~h~0I~G~90I~H~R~u~Z~W~1h~d~H~N~l~d~C~B~h~I~H~N~p~I~H~R~w~a~X~J~j~c~y~B~z~a~W~h~U~I~C~M~=
# L~m~5v~a~X~R~h~c~m~V~w~b~29j~I~G~R~u~Y~S~B~u~b~2l~0Y~X~J~v~b~H~B~4Z~S~B~s~d~W~Z~l~Y~2F~l~c~C~B~z~d~H~J~v~c~H~B~1c~y~B~u~b~2l~0Y~X~J~l~Z~G~V~G~I~G~N~p~d~G~N~h~b~G~F~H~I~G~V~o~V~C~A~j~
# O~m~90I~G~R~l~d~G~l~t~a~W~w~g~d~G~9u~I~H~R~1Y~i~B~n~b~m~l~k~d~W~x~j~b~m~k~g~L~G~5v~a~X~R~j~Y~S~B~5c~m~F~u~a~W~x~w~a~W~N~z~a~W~Q~g~b~m~k~g~d~G~x~1c~2V~y~I~H~l~h~b~S~B~s~b~290I~H~N~p~a~H~Q~g~Z~m~8g~Z~X~N~1I~G~R~l~e~m~l~y~b~2h~0d~W~F~u~V~S~A~j~
#
# I~C~B~z~Z~W~d~l~b~G~l~2a~X~J~w~I~G~5v~a~X~R~h~Y~2l~u~d~W~1t~b~2M~g~Z~m~8g~b~m~9p~c~25l~c~H~N~1c~y~B~5c~m~F~y~b~3B~t~Z~V~Q~g~8J~+T~t~S~A~t~I~w~==
# K~X~R~l~a~2N~p~d~C~B~u~c~n~V~0Z~X~I~g~b~24o~I~G~1p~U~i~B~y~Z~X~R~1T~y~B~l~a~H~Q~g~b~3Q~g~b~m~9p~d~G~F~j~b~2x~l~c~i~B~0b~m~V~u~Y~W~1y~Z~V~A~g~8J~+b~u~C~A~t~I~w~==
# I~C~B~l~c~m~9D~I~G~N~p~a~H~R~h~c~G~1F~I~G~V~o~d~C~B~o~d~G~l~3I~G~5v~a~X~R~h~e~m~l~u~b~3J~o~Y~255c~y~1l~c~i~B~5c~m~90Y~W~R~u~Y~U~0g~8J~+n~o~C~A~t~I~w~==
# I~C~A~p~Z~W~x~i~Y~W~R~u~d~W~Z~l~c~i~1u~b~24o~I~H~N~0a~W~R~l~c~m~M~g~b~m~9v~b~S~B~u~a~S~B~l~b~G~J~h~e~W~F~w~I~H~N~l~b~m~l~G~I~P~C~f~k~r~g~g~L~S~M~=
# I~C~A~p~c~G~l~o~c~25y~Z~X~R~u~a~S~B~k~a~W~F~w~b~n~U~o~I~H~l~0d~W~Q~g~b~m~9p~d~G~F~2Y~W~N~4Z~S~B~k~a~W~9y~Z~X~R~z~Y~S~B~v~d~C~B~0b~m~V~t~b~m~d~p~c~3N~B~I~P~C~f~m~6A~g~L~S~M~=
# I~C~B~h~Z~2V~t~T~y~B~u~b~2l~0Y~X~R~T~I~G~x~h~d~G~l~i~c~k~8g~b~m~8g~Z~25p~a~H~N~h~d~y~1o~c~2l~k~I~G~N~p~b~X~N~v~Y~y~B~v~d~C~B~u~b~2l~0Y~W~d~l~b~G~V~S~I~P~C~f~p~70g~L~S~M~=
# I~C~A~p~c~2V~n~Y~X~V~n~b~m~F~s~I~D~M~z~I~G~x~s~Y~S~B~u~a~S~A~s~Z~H~V~v~b~C~B~0d~W~8o~I~G~V~j~a~X~Z~y~Z~V~M~g~Z~m~8g~c~21y~Z~V~Q~g~Y~2l~0Y~2F~s~Y~W~d~y~Z~X~R~u~S~S~B~l~a~H~Q~g~Z~m~8g~b~m~9p~d~G~F~0a~W~N~l~U~i~D~w~n~5O~a~I~C~0j~
# I~C~A~p~b~29n~I~G~V~n~a~W~V~i~I~H~l~i~I~G~R~l~c~m~V~0Y~W~M~o~I~H~R~p~b~W~11U~y~B~l~Y~25h~a~W~x~w~b~W~9D~I~G~N~p~d~G~N~h~b~G~F~H~I~G~x~h~d~W~5u~Q~S~B~l~a~H~Q~g~d~G~E~g~Z~W~N~u~Y~W~R~u~Z~X~R~0Y~S~B~k~Z~W~N~y~b~0Y~g~8J~+R~v~S~A~t~I~w~==
# c~25v~b~G~9j~a~W~1l~U~y~B~u~Z~W~t~v~c~k~I~g~Z~m~8g~b~W~x~h~Z~V~I~g~Z~W~h~0I~G~90I~H~R~u~Z~W~1o~c~2l~u~Y~U~I~g~8J~+a~q~y~A~t~I~w~==
# I~C~B~z~Z~25p~d~G~V~l~T~S~B~l~d~G~l~u~a~W~Z~u~S~S~B~m~b~y~B~s~a~W~N~u~d~W~9D~I~G~V~o~d~C~B~v~d~C~B~0b~m~V~t~b~m~d~p~c~3N~h~Z~X~I~g~Z~X~Z~p~d~G~F~y~d~H~N~p~b~m~l~t~Z~E~E~g~4o~+z~I~C~0j~
# Z~W~x~j~e~W~M~g~c~m~F~s~b~3M~g~Z~W~5v~I~H~J~v~Z~i~B~0c~3V~k~c~m~F~0c~y~B~k~Z~X~R~h~b~m~l~l~Z~m~Z~h~Y~y~B~m~b~y~B~u~b~2l~0Y~2l~y~d~H~N~l~U~i~D~v~u~I~/i~m~J~U~g~L~S~M~=
# I~w~==
# I~C~o~q~K~i~B~s~b~290I~H~N~p~a~H~Q~g~Z~m~8g~Z~X~N~1I~G~R~l~e~m~l~y~b~2h~0d~W~F~u~d~S~B~0Y~W~V~w~Z~V~I~g~c~m~9m~I~H~N~l~Y~25l~d~X~F~l~c~25v~Q~y~A~q~K~i~o~g~I~w~==
# K~i~o~q~I~D~p~n~b~m~l~3b~2x~s~b~2Y~g~Z~W~h~0I~G~90I~G~R~l~d~G~l~t~a~W~w~g~d~G~9u~I~G~V~y~Y~S~B~0d~W~I~g~Z~W~R~1b~G~N~u~a~S~A~q~K~i~o~g~I~w~==
# I~w~==
# I~C~A~p~d~H~V~v~d~G~5p~c~n~A~g~c~m~l~u~Z~X~Z~1b~3M~g~b~G~F~u~b~2l~0c~G~8g~a~H~R~p~d~y~g~g~e~W~x~i~b~W~V~z~c~2F~z~a~W~Q~g~c~m~F~s~d~W~N~l~b~G~9N~I~P~C~f~p~6w~g~L~S~M~=
# K~W~1s~Y~W~V~y~L~X~N~z~b~3J~j~K~C~B~u~b~2l~0Y~W~x~p~a~G~l~u~b~m~E~g~b~G~F~0b~1Q~g~8J~+S~g~C~A~t~I~w~==
# I~w~==
# K~i~o~6d~G~V~n~c~m~9m~I~H~Q~n~b~m~9k~I~G~R~u~Q~S~o~q~I~C~M~=
# K~m~5v~a~X~R~h~e~m~l~y~b~3B~h~V~i~o~g~8J~+S~p~S~A~t~I~w~==
#
# I~C~A~u~a~H~R~h~c~C~B~y~d~W~95I~G~5v~I~H~l~s~d~G~h~n~a~X~J~i~I~G~V~u~a~W~h~z~I~H~N~y~Y~X~R~z~I~G~V~o~d~C~B~5Y~U~0g~4p~y~o~I~C~M~=
# I~C~A~u~d~G~F~l~c~m~c~g~Z~25p~b~2Q~g~Z~X~L~i~g~J~l~1b~1k~g~8J~+Y~i~i~A~j~
# L~m~V~2b~2w~g~a~H~R~p~d~y~B~l~Z~G~9j~b~m~U~g~L~G~V~y~Y~W~M~g~a~H~R~p~d~y~B~l~Z~G~9j~Z~W~Q~g~O~n~J~l~Y~m~1l~b~W~V~S~I~P~C~f~m~7g~g~I~w~==
# L~m~V~2a~X~R~h~d~G~5l~c~2V~y~c~G~V~y~I~G~5v~a~X~R~h~c~m~V~k~Z~U~Y~g~Y~2l~0Y~2F~s~Y~U~c~g~b~G~F~j~b~2w~g~c~n~V~v~e~S~B~0Y~2F~0b~m~9j~I~C~x~z~b~m~9p~d~H~N~l~d~X~E~g~e~W~5h~I~G~V~2Y~W~g~g~d~W~95I~G~Z~J~I~C~M~=
# 8J~+b~u~C~D~w~n~5q~A~I~C~M~=
