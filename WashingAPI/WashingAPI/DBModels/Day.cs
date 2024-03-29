﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace WashingAPI.DBModels
{
    [Table("Day")]
    public partial class Day
    {
        public Day()
        {
            Timeslots = new HashSet<Timeslot>();
        }

        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Required]
        [StringLength(255)]
        public string ResDate { get; set; }
        [Column("greenDay")]
        public bool GreenDay { get; set; }

        [InverseProperty(nameof(Timeslot.Day))]
        public virtual ICollection<Timeslot> Timeslots { get; set; }
    }
}