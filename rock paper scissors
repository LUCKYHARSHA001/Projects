#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <string.h>

// ANSII CODES DEFINED
#define RED     "\x1b[31m"
#define GREEN   "\x1b[32m"
#define YELLOW  "\x1b[33m"
#define BLUE    "\x1b[34m"
#define MAGENTA "\x1b[35m"
#define CYAN    "\x1b[36m"
#define RESET   "\x1b[0m"

int main() {
    int playerScore = 0, computerScore = 0, rounds = 0;
    char playerMove[10], computerMove[10];
    srand(time(NULL));
    
    printf(CYAN"Welcome to Rock-Paper-Scissors!\n"RESET);
    printf("Enter 'q' to quit the game.\n");
    
    while (1) {
    	
        printf("\nRound %d\n", rounds + 1);
        printf(GREEN"Player Score: %d\n"RESET, playerScore);
        printf(RED"Computer Score: %d\n"RESET, computerScore);
        printf("Enter your move (rock, paper, or scissors): ");
        scanf("%s", playerMove);
        
        if (playerMove[0] == 'q') {
            printf(GREEN"Thanks for playing!\n"RESET);
            break;
        }
        
        int computerChoice = rand() % 3;
        
        if (computerChoice == 0) {
            strcpy(computerMove, "rock");
        } else if (computerChoice == 1) {
            strcpy(computerMove, "paper");
        } else {
            strcpy(computerMove, "scissors");
        }
        
        printf("Computer chooses %s.\n", computerMove);
        
        if (strcmp(playerMove, "rock") == 0) {
            if (strcmp(computerMove, "rock") == 0) {
                printf(MAGENTA"It's a tie!\n"RESET);
            } else if (strcmp(computerMove, "paper") == 0) {
                printf(RED"Computer wins this round!\n"RESET);
                computerScore++;
            } else {
                printf(GREEN"You win this round!\n"RESET);
                playerScore++;
            }
        } else if (strcmp(playerMove, "paper") == 0) {
            if (strcmp(computerMove, "rock") == 0) {
                printf(GREEN"You win this round!\n"RESET);
                playerScore++;
            } else if (strcmp(computerMove, "paper") == 0) {
                printf(MAGENTA"It's a tie!\n"RESET);
            } else {
                printf(RED"Computer wins this round!\n"RESET);
                computerScore++;
            }
        } else if (strcmp(playerMove, "scissors") == 0) {
            if (strcmp(computerMove, "rock") == 0) {
                printf(RED"Computer wins this round!\n"RESET);
                computerScore++;
            } else if (strcmp(computerMove, "paper") == 0) {
                printf(GREEN"You win this round!\n"RESET);
                playerScore++;
            } else {
                printf(MAGENTA"It's a tie!\n"RESET);
            }
        } else {
            printf(RED"Invalid move. Try again.\n"RESET);
        }
        rounds++;
    }
    return 0;
}
