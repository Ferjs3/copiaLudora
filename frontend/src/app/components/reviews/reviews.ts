import { Component, computed, effect, inject, input, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ReviewService } from '../../services/review-service';
import { Review, ReviewRequest } from '../../models/review';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './reviews.html',
  styleUrl: './reviews.css',
})
export class Reviews{
  gameId = input.required<string>();

  private reviewService = inject(ReviewService);

  reviews = signal<Review[]>([]);
  currentPage = signal<number>(0);
  totalPages = signal<number>(1);
  totalElements = signal<number>(0);
  isLoading = signal<boolean>(false);

  ratingFilter = signal<number | null>(null);
  onlyMineFilter = signal<boolean>(false);

  showForm = signal<boolean>(false);
  newRating: number = 5;
  newComment: string = '';

  hasMoreReviews = computed(() => this.currentPage() < this.totalPages() - 1);

  averageRating = computed(() => {
    const list = this.reviews();
    if (list.length === 0) return '0.0';
    const sum = list.reduce((acc, rev) => acc + rev.rating, 0);
    return (sum / list.length).toFixed(1);
  });

  constructor() {
    effect(() => {
      const id = this.gameId();
      if (id) {
        this.fetchReviews(true);
      }
    });
  }

  fetchReviews(reset: boolean = false): void {
    if (reset) {
      this.currentPage.set(0);
    }

    this.isLoading.set(true);

    this.reviewService.getReviews({
      gameId: this.gameId(),
      page: this.currentPage(),
      size: 10,
      minRating: this.ratingFilter() ?? undefined,
      maxRating: this.ratingFilter() ?? undefined
    }).subscribe({
      next: (res) => {
        this.totalPages.set(res.totalPages);
        this.totalElements.set(res.totalElements);

        if (reset) {
          this.reviews.set(res.content);
        } else {
          this.reviews.update(prev => [...prev, ...res.content]);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching reviews:', err);
        this.isLoading.set(false);
      }
    });
  }

  loadMoreReviews(): void {
    if (this.hasMoreReviews() && !this.isLoading()) {
      this.currentPage.update(p => p + 1);
      this.fetchReviews(false);
    }
  }

  filterAll(): void {
    this.ratingFilter.set(null);
    this.onlyMineFilter.set(false);
    this.fetchReviews(true);
  }

  onSelectRating(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.ratingFilter.set(value ? Number(value) : null);
    this.fetchReviews(true);
  }

  setRating(value: number): void {
    this.newRating = value;
  }

  toggleForm(): void {
    this.showForm.update(val => !val);
  }

  submitReview(): void {
    if (!this.newComment.trim()) return;

    const clientUuid = 'UUID_DEL_USUARIO_LOGUEADO';

    const request: ReviewRequest = {
      gameExternalId: this.gameId(),
      clientExternalId: clientUuid,
      rating: this.newRating,
      comment: this.newComment
    };

    this.reviewService.createReview(request).subscribe({
      next: () => {
        this.newComment = '';
        this.newRating = 5;
        this.showForm.set(false);
        this.fetchReviews(true);
      },
      error: (err) => console.error('Error submitting review:', err)
    });
  }

  deleteReview(externalId: string): void {
    this.reviewService.deleteReview(externalId).subscribe({
      next: () => {
        this.reviews.update(list => list.filter(r => r.externalId !== externalId));
        this.totalElements.update(total => Math.max(0, total - 1));
      },
      error: (err) => console.error('Error deleting review:', err)
    });
  }
}