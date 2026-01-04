from flask import Flask, render_template, request, jsonify
import math

app = Flask(__name__)

# Check winner
def check_winner(board):
    wins = [
        (0,1,2),(3,4,5),(6,7,8),
        (0,3,6),(1,4,7),(2,5,8),
        (0,4,8),(2,4,6)
    ]
    for i,j,k in wins:
        if board[i] == board[j] == board[k] and board[i] != "":
            return board[i]
    return None

# Minimax Algorithm
def minimax(board, is_ai):
    winner = check_winner(board)
    if winner == "O":
        return 1
    if winner == "X":
        return -1
    if "" not in board:
        return 0

    if is_ai:
        best = -math.inf
        for i in range(9):
            if board[i] == "":
                board[i] = "O"
                score = minimax(board, False)
                board[i] = ""
                best = max(best, score)
        return best
    else:
        best = math.inf
        for i in range(9):
            if board[i] == "":
                board[i] = "X"
                score = minimax(board, True)
                board[i] = ""
                best = min(best, score)
        return best

# AI move
def ai_move(board):
    best_score = -math.inf
    move = None
    for i in range(9):
        if board[i] == "":
            board[i] = "O"
            score = minimax(board, False)
            board[i] = ""
            if score > best_score:
                best_score = score
                move = i
    board[move] = "O"
    return board

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/ai-move", methods=["POST"])
def ai():
    data = request.json
    board = data["board"]

    if "" in board:
        board = ai_move(board)


    winner = check_winner(board)
    if winner:
        return jsonify({
            "board": board,
            "game_over": True,
            "message": f"{winner} Wins!"
        })

    if "" not in board:
        return jsonify({
            "board": board,
            "game_over": True,
            "message": "It's a Draw!"
        })

    return jsonify({
        "board": board,
        "game_over": False,
        "message": "Your turn"
    })

if __name__ == "__main__":
    app.run(debug=True)
