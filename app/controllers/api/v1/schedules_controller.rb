class Api::V1::SchedulesController < ApplicationController
  def index
    schedules = Schedule.all
    render json: {schedules: schedules}
  end

  def create
    schedule = Schedule.new(schedule_params)
    if schedule.save
      render json: {schedule: schedule}, status: 200
    else
      render json: {errors: schedule.errors.full_messages}, status: 400
    end
  end

  private
  def schedule_params
    params.require(:schedule).permit(:title, :description, :start_time, :end_time)
  end
end